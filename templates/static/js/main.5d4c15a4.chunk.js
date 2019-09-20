(window["webpackJsonpweb-client"]=window["webpackJsonpweb-client"]||[]).push([[0],{175:function(e,t,a){e.exports=a(314)},180:function(e,t,a){},181:function(e,t){if("undefined"===typeof moment){var a=new Error("Cannot find module 'moment'");throw a.code="MODULE_NOT_FOUND",a}e.exports=moment},314:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(26),o=a.n(l),i=(a(180),a(83)),c=a(18),u=a(327),s=a(322),m=a(328),d=a(329),p=a(326),g=a(324),h=a(43),f=a(323),E=a(28),w=a(144),b=a.n(w),k=function(e){var t=r.a.useRef(null);return r.a.useEffect(function(){new b.a(t.current,{type:e.type,data:e.data,options:e.options})},[t,e.data,e.type,e.options,e.width,e.height]),r.a.createElement("canvas",{width:e.width,height:e.height,ref:t})},v=a(315),y=function(e){var t=r.a.useRef(null),a=r.a.useState(!1),n=Object(c.a)(a,2),l=n[0],o=n[1],i=r.a.useRef(null);return r.a.createElement(s.a,{text:!0,style:{marginTop:"7em"}},r.a.createElement(s.a,null,r.a.createElement(v.a,{primary:!0,onClick:function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(a){var n=a.getTracks(),r=[];i.current=new MediaRecorder(a,{mimeType:"audio/ogg"}),i.current.addEventListener("dataavailable",function(e){e.data.size>0&&r.push(e.data)}),i.current.addEventListener("stop",function(){t.current.href=URL.createObjectURL(new Blob(r)),n.map(function(e){return e.stop()}),t.current.download="acetest.wav";var a=new FormData;a.append("file",new Blob(r)),a.append("speakers_count",e.speakersCount),e.setIsLoading(!0),fetch("/uploadAudio",{method:"post",body:a}).then(function(e){return e.json()}).then(function(t){e.visualize(t)}).finally(function(){e.setIsLoading(!1)})}),i.current.start(),o(!0)})}},"Start the meeting"),r.a.createElement(v.a,{disabled:!l,secondary:!0,onClick:function(){o(!1),i.current.stop()}},"Stop the meeting"),r.a.createElement(h.a,null,"Speakers count",r.a.createElement(f.a,{min:0,value:e.speakersCount,onChange:function(t){return e.setSpeakersCount(t.target.value)},icon:"users",iconPosition:"left",placeholder:"speakers count...",type:"number"}))),r.a.createElement(s.a,null,r.a.createElement("a",{ref:t},"Download meeting")),r.a.createElement(s.a,null,r.a.createElement(h.a,null,"Upload your meeting",r.a.createElement(f.a,{onChange:function(t){var a=new FormData;a.append("file",t.target.files[t.target.files.length-1]),a.append("speakers_count",e.speakersCount),e.setIsLoading(!0),fetch("/uploadAudio",{method:"post",body:a}).then(function(e){return e.json()}).then(function(t){e.visualize(t)}).finally(function(){e.setIsLoading(!1)})},icon:"phoenix framework",iconPosition:"left",placeholder:"upload your meeting",type:"file"}))))};function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var C=function(){var e=r.a.useState(3),t=Object(c.a)(e,2),a=t[0],n=t[1],l=r.a.useState({}),o=Object(c.a)(l,2),w=o[0],b=o[1],v=r.a.useState({}),C=Object(c.a)(v,2),j=C[0],S=C[1],x=r.a.useState([]),R=Object(c.a)(x,2),_=R[0],P=R[1],L=r.a.useState([]),D=Object(c.a)(L,2),M=D[0],I=D[1],T=r.a.useState([]),z=Object(c.a)(T,2),U=z[0],A=z[1],B=r.a.useState(!1),F=Object(c.a)(B,2),G=F[0],H=F[1],N=E.b().domain(_.map(function(e){return e.ratio})).range(E.c),W=function(e){var t=_.find(function(t){return t.speaker_id===e});return N(t.ratio)},J=function(e){return j[e]||e};return r.a.createElement("div",null,r.a.createElement(u.a,{fixed:"top",inverted:!0},r.a.createElement(s.a,null,r.a.createElement(u.a.Item,{as:"a",header:!0},"Meeting moderator"),r.a.createElement(u.a.Item,{as:"a"},"Home"))),r.a.createElement(m.a,{columns:3,padded:!0},r.a.createElement(m.a.Row,null,r.a.createElement(m.a.Column,null),r.a.createElement(m.a.Column,null,r.a.createElement(d.a,null,r.a.createElement(y,{visualize:function(e){b(e.sentiment),P(e.speakers),I(e.topics),A(e.transcript)},setIsLoading:H,speakersCount:a,setSpeakersCount:n}))),r.a.createElement(m.a.Column,null)),G?r.a.createElement(m.a.Row,null,r.a.createElement(m.a.Column,null),r.a.createElement(m.a.Column,null,r.a.createElement(s.a,{style:{width:"600px"}},r.a.createElement(p.a,{active:!0,inverted:!0},r.a.createElement(g.a,{inverted:!0},"Loading"))))):0===_.length?"No data available":r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a.Row,null,r.a.createElement(m.a.Column,null,r.a.createElement(s.a,null,r.a.createElement("details",null,r.a.createElement("summary",null,"Set speakers name"),_.map(function(e){return r.a.createElement(h.a,{key:e.speaker_id},e.speaker_id,r.a.createElement(f.a,{value:J(e.speaker_id),onChange:function(t){S(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},j,Object(i.a)({},e.speaker_id,t.target.value)))}}))}))))),r.a.createElement(m.a.Row,null,r.a.createElement(m.a.Column,null,r.a.createElement(s.a,{style:{width:"600px"}},r.a.createElement("h1",null,"Sentiment "),r.a.createElement("p",null,"How was the general feeling during the meeting"),r.a.createElement("small",null,"Green means more positive, and red means negative"),r.a.createElement("img",{src:"//raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png",alt:"RdYlGn",width:"100%",height:"40"}),r.a.createElement(k,{width:200,height:200,type:"bar",data:{datasets:[{label:"Sentiment",data:[w.magnitude],backgroundColor:[E.a(E.b().domain([-1,1]).range([0,1])(w.score))]}]},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}}))),r.a.createElement(m.a.Column,null,r.a.createElement(s.a,{style:{width:"600px"}},r.a.createElement("h1",null,"Topics covered "),r.a.createElement("p",null,"What was taked about during the meeting"),r.a.createElement("small",null,"The size of each part of the Pie, coresponds to how long it was covered"),r.a.createElement(k,{width:200,height:200,type:"pie",data:{datasets:[{data:M.map(function(e){return e.ratio}),backgroundColor:E.c}],labels:M.map(function(e){return e.topic})},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}}))),r.a.createElement(m.a.Column,null,r.a.createElement(s.a,{style:{width:"600px"}},r.a.createElement("h1",null,"Speakers contriputions ratio"),r.a.createElement("p",null,"How long each speaker participated to the meeting"),r.a.createElement("small",null,"The size of each part of the Pie, coresponds to how long the speaker talked"),r.a.createElement(k,{width:200,height:200,type:"pie",data:{datasets:[{data:_.map(function(e){return e.ratio}),backgroundColor:E.c}],labels:_.map(function(e){var t=e.speaker_id;return J(t)})},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}})))),r.a.createElement(m.a.Row,null,r.a.createElement(m.a.Column,null,r.a.createElement("h1",null,"Transcript"),r.a.createElement(s.a,{as:"ol"},U.map(function(e){return r.a.createElement("li",{key:e.speaker_id,style:{padding:"10px",borderRadius:"30px",background:W(e.speaker_id)}},r.a.createElement(h.a,{style:{marginRight:"20px"}},r.a.createElement("strong",null,"<".concat(J(e.speaker_id),">"))),e.line)})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[175,1,2]]]);
//# sourceMappingURL=main.5d4c15a4.chunk.js.map