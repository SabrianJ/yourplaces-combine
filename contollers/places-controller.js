const HttpError = require("../models/http-error");
const fs = require("fs");
const uuid = require("uuid");
const { validationResult } = require("express-validator");

const getCoordsForAddrress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Couldn't find a place for the provided id",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  // if(!places || places.length === 0)
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    // return res.status(404).json({message: "couldn't find a place for the provided user id"});
    return next(
      new HttpError("Couldn't find places for the provided user id", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const { title, description, address} = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddrress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = await new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path.replaceAll("\\", "/"),
    creator: req.userData.userId ,
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't update place",
      500
    );
    return next(error);
  }

  if(place.creator.toString() !== req.userData.userId){
    const error = new HttpError(
      "Ypu are not allowed to edit this place",
      401
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't update place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't delete place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Couldn't not find place for this id", 404);
    return next(error);
  }

  if(place.creator.id !== req.userData.userId){
    const error = new HttpError(
      "You are not allowed to edit this place",
      401
    );
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess,  validateModifiedOnly: true});
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, couldn't delete place",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
