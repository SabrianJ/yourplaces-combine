(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{41:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(48);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},48:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(46),c=a.n(n),r=a(47),l=a(8),o=a(0),s=a.n(o),i=a(1),u=a(49),m=a(13),p=a(41),d=a(43),E=a(57),f=(a(64),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:n});new window.google.maps.Marker({position:a,map:e})}),[a,n]),s.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),h=a(9),v=a(50),b=(a(65),function(e){var t=Object(o.useContext)(h.a),a=Object(o.useState)(!1),n=Object(l.a)(a,2),b=n[0],g=n[1],k=Object(o.useState)(!1),N=Object(l.a)(k,2),O=N[0],j=N[1],w=Object(v.a)(),C=w.isLoading,_=w.error,y=w.sendRequest,I=w.clearError,D=Object(i.g)(),L=function(){return g(!1)},x=function(){j(!1)};return s.a.createElement(s.a.Fragment,null,s.a.createElement(u.a,{error:_,onClear:I}),s.a.createElement(E.a,{show:b,onCancel:L,header:e.address,contentClass:"place-item__modal_content",footerClass:"place-item__modal_actions",footer:s.a.createElement(d.a,{onClick:L},"Close")},s.a.createElement("div",{className:"map-container"},s.a.createElement(f,{center:e.coordinates,zoom:16}))),s.a.createElement(E.a,{show:O,onCancel:x,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{inverse:!0,onClick:x},"CANCEL"),s.a.createElement(d.a,{danger:!0,onClick:function(){j(!1),function(){var a=Object(r.a)(c.a.mark((function a(){return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,y("".concat("https://yourplaces-combine.herokuapp.com/api","/places/").concat(e.id),"DELETE",null,{Authorization:"Bearer "+t.token});case 3:e.onDelete(e.id),a.next=8;break;case 6:a.prev=6,a.t0=a.catch(0);case 8:case"end":return a.stop()}}),a,null,[[0,6]])})));return function(){return a.apply(this,arguments)}}()(),D.push("/".concat(t.userId,"/places"))}},"DELETE"))},s.a.createElement("p",null,"Dp ypu want to proceed and delete this place?")),s.a.createElement("li",{className:"place-item"},s.a.createElement(p.a,{className:"place-item__content"},C&&s.a.createElement("div",{className:"center"},s.a.createElement(m.a,null)),s.a.createElement("div",{className:"place-item__image"},s.a.createElement("img",{src:"".concat("https://yourplaces-combine.herokuapp.com","/").concat(e.image),alt:e.title})),s.a.createElement("div",{className:"place-item__info"},s.a.createElement("h2",null,e.title),s.a.createElement("h3",null,e.address),s.a.createElement("p",null,e.description)),s.a.createElement("div",{className:"place-item__actions"},s.a.createElement(d.a,{inverse:!0,onClick:function(){return g(!0)}},"VIEW ON MAP"),t.isLoggedIn&&t.userId===e.creatorId&&s.a.createElement(d.a,{to:"/places/".concat(e.id)},"EDIT"),t.isLoggedIn&&t.userId===e.creatorId&&s.a.createElement(d.a,{danger:!0,onClick:function(){j(!0)}},"DELETE")))))}),g=(a(66),function(e){return 0===e.items.length?s.a.createElement("div",{className:"place-list center"},s.a.createElement(p.a,null,s.a.createElement("h2",null,"No place found maybe crate one"),s.a.createElement(d.a,{to:"/places/new"},"Share Place"))):s.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return s.a.createElement(b,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(i.h)().userId,t=Object(v.a)(),a=t.isLoading,n=t.error,p=t.sendRequest,d=t.clearError,E=Object(o.useState)([]),f=Object(l.a)(E,2),h=f[0],b=f[1];Object(o.useEffect)((function(){(function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p("".concat("https://yourplaces-combine.herokuapp.com/api","/places/user/").concat(e));case 3:a=t.sent,b(a.places),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}})()()}),[p,e]);return s.a.createElement(o.Fragment,null,s.a.createElement(u.a,{error:n,onClear:d}),a&&s.a.createElement("div",{className:"center"},s.a.createElement(m.a,null)),!a&&h&&s.a.createElement(g,{items:h,onDeletePlace:function(e){b((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.554bc8b9.chunk.js.map