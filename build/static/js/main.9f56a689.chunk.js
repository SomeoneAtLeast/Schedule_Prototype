(this.webpackJsonpschedule_prototype=this.webpackJsonpschedule_prototype||[]).push([[0],{34:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);for(var s=a(0),n=a(1),i=a.n(n),r=a(19),c=a.n(r),l=(a(34),a(10)),o=a(11),d=a(13),h=a(12),b=a(15),u=a(5),m=a(3),f=function(e){return{type:"Select-Worker",id:e}},j=function(e,t,a){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"common";return{type:"Change-Day-Type",workerId:e,dayId:t,objKey:a,scheduleType:s}},k=function(e,t,a,s){return{type:"Text-Change",id:e,dataArr:t,objKey:a,e:s}},p=(a(41),a(42),a(43),Object(m.b)()((function(e){var t=e.btnText,a=e.btnQuantity,n=e.id,i=e.active,r=e.img,c=e.MakeFilterActive,l=e.FilterSelect,o="filter-list__filter";return i&&(o+=" active-filter"),Object(s.jsx)("li",{className:o,children:Object(s.jsxs)("button",{className:"filter-list__filter-btn",onClick:function(){l(),c()},children:[Object(s.jsx)("img",{className:"filter-list__filter-img",src:r,alt:t}),Object(s.jsxs)("div",{className:"filter-list__text",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:a})]})]},n)})}))),w=a.p+"static/media/all.367a7986.svg",v=a.p+"static/media/work.2a4c9830.svg",g=a.p+"static/media/weekend.7c7322fa.svg",O=a.p+"static/media/vacation.b68047b2.svg",N=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"componentWillUnmount",value:function(){this.props.FilterSelect("all")}},{key:"render",value:function(){var e=this.props,t=e.workers,a=e.selectedWorker,n=e.FilterSelect,i=e.MakeFilterActive,r=e.allActive,c=e.workedActive,l=e.weekendsActive,o=e.vacationActive,d=t[a].days.filter((function(e){return e.worked})).length,h=t[a].days.filter((function(e){return e.weekend})).length,b=t[a].days.filter((function(e){return e.vacation})).length,u=t[a].days.length,m=[{name:"all",label:"\u0412\u0441\u0435 \u0434\u043d\u0438",img:w,id:-1,quantity:u,active:r},{name:"worked",label:"\u0420\u0430\u0431\u043e\u0447\u0438\u0435",img:v,id:-2,quantity:d,active:c},{name:"weekends",label:"\u0412\u044b\u0445\u043e\u0434\u043d\u044b\u0435",img:g,id:-3,quantity:h,active:l},{name:"vacation",label:"\u041e\u0442\u043f\u0443\u0441\u043a",img:O,id:-4,quantity:b,active:o}];return Object(s.jsx)("ul",{className:"filter-list",children:m.map((function(e){var t=e.label,a=e.quantity,r=e.id,c=e.img,l=e.active,o=e.name;return Object(s.jsx)(p,{btnText:t,btnQuantity:a,id:r,img:c,active:l,FilterSelect:function(){return n(o)},MakeFilterActive:function(){return i(r)}},r)}))})}}]),a}(n.Component),_={FilterSelect:function(e){return{type:"Filter-Select",filter:e}},MakeFilterActive:function(e){return{type:"Make-Filter-Active",id:e}}},x=Object(m.b)((function(e){return{workers:e.workers,selectedWorker:e.selectedWorker,allActive:e.allActive,workedActive:e.workedActive,weekendsActive:e.weekendsActive,vacationActive:e.vacationActive}}),_)(N),y=a(6),A=a(2),I=(a(44),a(45),a.p+"static/media/cross.8cf57c3d.svg"),C=Object(m.b)()((function(e){var t=e.workingHours,a=e.onMakeDayWorking,n=e.onMakeDayWeekend,i=e.onMakeDayVacation;return Object(s.jsxs)("div",{className:"days-field-personal__item-body",children:[Object(s.jsx)("div",{className:"days-field-personal__item-hours",children:t}),Object(s.jsxs)("div",{className:"days-field-personal__btn-group",children:[Object(s.jsx)("button",{title:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0440\u0430\u0431\u043e\u0447\u0438\u043c",className:"days-field-personal__btn days-field-personal__work-btn",onClick:a,children:Object(s.jsx)("img",{src:v,alt:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0440\u0430\u0431\u043e\u0447\u0438\u043c"})}),Object(s.jsx)("button",{title:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u043c",className:"days-field-personal__btn days-field-personal__work-btn",onClick:n,children:Object(s.jsx)("img",{src:g,alt:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u043c"})}),Object(s.jsx)("button",{title:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0434\u043d\u0435\u043c \u043e\u0442\u043f\u0443\u0441\u043a\u0430",className:"days-field-personal__btn days-field-personal__work-btn",onClick:i,children:Object(s.jsx)("img",{src:O,alt:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0434\u043d\u0435\u043c \u043e\u0442\u043f\u0443\u0441\u043a\u0430"})}),Object(s.jsx)("button",{title:"\u0412\u044b\u0439\u0442\u0438",className:"days-field-personal__btn days-field-personal__work-btn",children:Object(s.jsx)("img",{src:I,alt:"\u0412\u044b\u0439\u0442\u0438"})})]})]})})),S=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.SelectWorker(this.props.id),this.props.ClearAllDays()}},{key:"componentWillUnmount",value:function(){this.props.ClearAllDays()}},{key:"filterDays",value:function(e,t){return"worked"===t?e.filter((function(e){return e.worked})):"weekends"===t?e.filter((function(e){return e.weekend})):"vacation"===t?e.filter((function(e){return e.vacation})):e}},{key:"filterWorkers",value:function(e,t,a){var s=this.props.workers;if("worked"===a){var n=e.filter((function(e){return e.worked})),i=Object(A.a)(Object(A.a)({},s[t]),{},{days:n});return[].concat(Object(y.a)(s.slice(0,t)),[i],Object(y.a)(s.slice(t+1)))}if("weekends"===a){var r=e.filter((function(e){return e.weekend})),c=Object(A.a)(Object(A.a)({},s[t]),{},{days:r});return[].concat(Object(y.a)(s.slice(0,t)),[c],Object(y.a)(s.slice(t+1)))}if("vacation"===a){var l=e.filter((function(e){return e.vacation})),o=Object(A.a)(Object(A.a)({},s[t]),{},{days:l});return[].concat(Object(y.a)(s.slice(0,t)),[o],Object(y.a)(s.slice(t+1)))}return s}},{key:"getWorkerPresonalDays",value:function(e){var t=this.props,a=t.workers,n=t.ChangeDayType,i=t.selectedWorker,r=t.filter,c=this.filterWorkers(a[i].days,i,r),l=[];0===c[e].days.length?l.push(Object(s.jsx)("td",{className:"days-field-personal__item days-field-personal__no-items",children:"\u0417\u0434\u0435\u0441\u044c \u043f\u0443\u0441\u0442\u043e"},e)):l.push(Object(s.jsx)("td",{className:"days-field-personal__item",children:a[e].name},e));var o=c[e].days.map((function(t){var i="days-field-personal__item",r=t.weekend,c=t.worked,l=t.vacation;return t.selected&&(i+=" selected"),c&&(i+=" worked"),r&&(i+=" weekend"),l&&(i+=" vacation"),Object(s.jsx)("td",{className:i,onClick:function(){return n(a[e].id,t.id,"selected","personal")},children:Object(s.jsx)(C,{workingHours:t.workingHours,onMakeDayWorking:function(){return n(a[e].id,t.id,"worked","personal")},onMakeDayWeekend:function(){return n(a[e].id,t.id,"weekend","personal")},onMakeDayVacation:function(){return n(a[e].id,t.id,"vacation","personal")}})},t.id)}));return l.push(o),l}},{key:"render",value:function(){var e=this.props,t=e.workers,a=e.selectedWorker,n=e.filter,i=e.id,r=this.filterDays(t[a].days,n).map((function(e){return Object(s.jsxs)("th",{className:"days-field-personal__item",children:[Object(s.jsx)("div",{children:e.id}),Object(s.jsx)("div",{children:e.dayName})]},e.id)}));return Object(s.jsx)("table",{className:"days-field-personal",children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{className:"days-field-personal-items-row",children:[Object(s.jsx)("th",{className:"days-field-personal__item",children:"\u0410\u043f\u0440\u0435\u043b\u044c"}),r]}),Object(s.jsx)("tr",{className:"days-field-personal-items-row",children:this.getWorkerPresonalDays(i)})]})})}}]),a}(n.Component),T={ClearAllDays:function(){return{type:"Clear-All-Days"}},ChangeDayType:j,SelectWorker:f},D=Object(m.b)((function(e){var t=e.workers,a=e.selectedDay,s=e.filter;return{workers:t,selectedWorker:e.selectedWorker,selectedDay:a,filter:s}}),T)(S),M=(a(46),{SelectWorker:f,ChangeDayType:j,SelectDay:function(e,t,a){return{type:"Select-Day",selectedWorker:e,selectedDay:t,ChangeDayType:a}}}),B=Object(m.b)((function(e){return{workers:e.workers}}),M)((function(e){var t=e.workers,a=e.SelectWorker,n=e.SelectDay,i=e.ChangeDayType,r=t[0].days.map((function(e){return Object(s.jsxs)("th",{className:"days-field-common-days-item",children:[Object(s.jsx)("div",{children:e.id}),Object(s.jsx)("div",{children:e.dayName})]},e.id)})),c=function(e){var r=[];r.push(Object(s.jsx)("td",{className:"days-field-common-item",onClick:function(){return a(e)},children:Object(s.jsx)(b.b,{to:"/personalschedule/".concat(e+1),className:"days-field-common-item-link",children:t[e].name})},e));for(var c=function(a){var c="days-field-common-item";t[e].days[a-1].selected&&(c+=" selected"),t[e].days[a-1].worked&&(c+=" worked"),t[e].days[a-1].weekend&&(c+=" weekend"),t[e].days[a-1].vacation&&(c+=" vacation");r.push(Object(s.jsx)("td",{className:c,onClick:function(){return n(t[e].id,t[e].days[a-1].id),void i(t[e].id,t[e].days[a-1].id,"selected")},children:t[e].days[a-1].workingHours},a+1e3))},l=1;l<=t[0].days.length;l++)c(l);return r};return Object(s.jsx)("table",{className:"days-field-common",children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{className:"days-field-common-items-row",children:[Object(s.jsx)("th",{className:"days-field-common-days-item",children:"\u0410\u043f\u0440\u0435\u043b\u044c"}),r]}),function(){var e=0;return t.map((function(t){return e++,Object(s.jsx)("tr",{className:"days-field-common-items-row",children:c(e-1)},t.name)}))}()]})})})),F=(a(50),a.p+"static/media/schedule.6d651227.svg"),W=a.p+"static/media/shifts.3a437317.svg",G=a.p+"static/media/seat.28c5181d.svg",E={MakeActiveNavBtn:function(e){return{type:"Make-Active-Nav-Btn",btnName:e}}},K=Object(m.b)((function(e){return{scheduleActive:e.scheduleActive,seatsActive:e.seatsActive,workingshiftsActive:e.workingshiftsActive}}),E)((function(e){var t=e.scheduleActive,a=e.seatsActive,n=e.workingshiftsActive,i=e.MakeActiveNavBtn,r="main-nav__item",c="main-nav__item",l="main-nav__item";return t&&(r+=" active-main-nav__item"),a&&(c+=" active-main-nav__item"),n&&(l+=" active-main-nav__item"),Object(s.jsxs)("ul",{className:"main-nav",children:[Object(s.jsx)("li",{className:r,onClick:function(){return i("scheduleBtn")},children:Object(s.jsxs)(b.b,{to:"/",className:"main-nav__item-link",children:[Object(s.jsx)("img",{className:"main-nav__item-link-img",src:F,alt:"\u0413\u0440\u0430\u0444\u0438\u043a"}),"\u0413\u0440\u0430\u0444\u0438\u043a"]})}),Object(s.jsx)("li",{className:l,onClick:function(){return i("workingshiftsBtn")},children:Object(s.jsxs)(b.b,{to:"/workingshifts/",className:"main-nav__item-link",children:[Object(s.jsx)("img",{className:"main-nav__item-link-img",src:W,alt:"\u0413\u0440\u0430\u0444\u0438\u043a"}),"\u0421\u043c\u0435\u043d\u044b"]})}),Object(s.jsx)("li",{className:c,onClick:function(){return i("seatsBtn")},children:Object(s.jsxs)(b.b,{to:"/seats/",className:"main-nav__item-link",children:[Object(s.jsx)("img",{className:"main-nav__item-link-img",src:G,alt:"\u0413\u0440\u0430\u0444\u0438\u043a"}),"\u041c\u0435\u0441\u0442\u0430"]})})]})})),Z=(a(51),a(17)),Y=(a(52),a.p+"static/media/chair.fd6261cc.svg"),U=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).state={oldIp:s.props.oldIp,newIp:s.props.newIp,seatNumber:s.props.seatNumber},s.onOldIpChange=s.onOldIpChange.bind(Object(Z.a)(s)),s.onNewIpChange=s.onNewIpChange.bind(Object(Z.a)(s)),s.onSeatNumberChange=s.onSeatNumberChange.bind(Object(Z.a)(s)),s}return Object(o.a)(a,[{key:"onOldIpChange",value:function(e){this.setState({oldIp:e.target.value})}},{key:"onNewIpChange",value:function(e){this.setState({newIp:e.target.value})}},{key:"onSeatNumberChange",value:function(e){this.setState({seatNumber:e.target.value})}},{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=t.ChangeSeatText;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("img",{className:"seats-table__img",alt:"\u041c\u0435\u0441\u0442\u043e",src:Y}),Object(s.jsxs)("div",{className:"seats-table__text-wrapper",onBlur:function(){return n(a,e.state.oldIp,e.state.newIp,e.state.seatNumber)},children:[Object(s.jsxs)("div",{className:"seats-table__text",children:[Object(s.jsx)("span",{className:"seats-table__label",children:"OLD IP"}),Object(s.jsx)("span",{className:"seats-table__value",children:Object(s.jsx)("input",{className:"seats-table__value-input",type:"text",maxLength:15,onChange:this.onOldIpChange,placeholder:"\u0421\u0442\u0430\u0440\u044b\u0439 IP",value:this.state.oldIp})})]}),Object(s.jsxs)("div",{className:"seats-table__text",children:[Object(s.jsx)("span",{className:"seats-table__label",children:"NEW IP"}),Object(s.jsx)("span",{className:"seats-table__value",children:Object(s.jsx)("input",{className:"seats-table__value-input",type:"text",maxLength:15,onChange:this.onNewIpChange,placeholder:"\u041d\u043e\u0432\u044b\u0439 IP",value:this.state.newIp})})]}),Object(s.jsxs)("div",{className:"seats-table__text",children:[Object(s.jsx)("span",{className:"seats-table__label",children:"\u041c\u0415\u0421\u0422\u041e"}),Object(s.jsx)("span",{className:"seats-table__value",children:Object(s.jsx)("input",{className:"seats-table__value-input",type:"text",maxLength:15,onChange:this.onSeatNumberChange,placeholder:"\u2116 \u043c\u0435\u0441\u0442\u0430",value:this.state.seatNumber})})]})]})]})}}]),a}(n.Component),P={ChangeSeatText:function(e,t,a,s){return{type:"Change-Seat-Text",NewOldIp:t,NewNewIp:a,NewSeatNumber:s,id:e}}},L=Object(m.b)((function(e){return{seats:e.seats}}),P)(U),R=Object(m.b)((function(e){return{seats:e.seats}}))((function(e){var t=function(e,t,a,n){var i=e.filter((function(e){return e.key>=t&&e.key<=a})),r=e.filter((function(e){return e.key>a&&e.key<n}));return Object(s.jsx)("table",{className:"seats-table",children:Object(s.jsxs)("tbody",{children:[Object(s.jsx)("tr",{className:"seats-table__row",children:i}),Object(s.jsx)("tr",{className:"seats-table__row",children:r})]})})},a=e.seats.map((function(e){var t=e.oldIp,a=e.newIp,n=e.seatNumber,i=e.id;return Object(s.jsx)("td",{className:"seats-table__\u0441ell",children:Object(s.jsx)(L,{id:i,oldIp:t,newIp:a,seatNumber:n})},i)}));return Object(s.jsxs)("div",{className:"seats-field",children:[Object(s.jsx)("div",{className:"seats-field-title",children:"\u0420\u0430\u0431\u043e\u0447\u0438\u0435 \u043c\u0435\u0441\u0442\u0430"}),Object(s.jsxs)("div",{className:"seats-field-tables",children:[t(a,10,12,16),t(a,16,18,22),t(a,22,24,28),t(a,28,30,34)]})]})})),V=(a(53),a.p+"static/media/clear.04e64939.svg"),Q=[{name:"worked",label:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0447\u0438\u043c",img:v,id:-2},{name:"weekend",label:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u043c",img:g,id:-3},{name:"vacation",label:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043e\u0442\u043f\u0443\u0441\u043a\u043e\u043c",img:O,id:-4},{name:"clear",label:"\u0423\u0431\u0440\u0430\u0442\u044c \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f",img:V,id:-5}],J={ChangeDayType:j},q=Object(m.b)((function(e){return{selectedWorker:e.selectedWorker,selectedDay:e.selectedDay}}),J)((function(e){var t=e.selectedWorker,a=e.selectedDay,n=e.ChangeDayType;return Object(s.jsx)("div",{className:"days-field-common-controls",children:Q.map((function(e){var i=e.name,r=e.label,c=e.img,l=e.id;return Object(s.jsxs)("button",{className:"days-field-common-controls-btn",onClick:function(){return n(t,a,i)},children:[Object(s.jsx)("img",{className:"days-field-common-controls-btn__img",src:c,alt:r}),Object(s.jsx)("span",{className:"days-field-common-controls-btn__text",children:r})]},l)}))})})),H=(a(54),a(55),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"makeCells",value:function(e,t,a){for(var n=this.props,i=n.shift,r=n.shifts,c=n.id,l=n.TextChange,o=[],d=function(e){o.push(Object(s.jsx)("td",{className:"working-shifts__table-cell working-shifts__table-cell-worker",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",value:i["worker".concat(e)],maxLength:31,onChange:function(t){return l(c,r,"worker".concat(e),t)}})},e+500))},h=e;h<=t;h++)d(h);return o.push(Object(s.jsx)("td",{className:"working-shifts__table-cell working-shifts__table-cell-worker",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:6,value:r[c-100][a],onChange:function(e){return l(c,r,a,e)}})},c)),o}},{key:"render",value:function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-workers",children:this.makeCells(0,2,"firstShiftNumber")}),Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-workers",children:this.makeCells(3,5,"secondShiftNumber")}),Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-workers",children:this.makeCells(6,8,"thirdShiftNumber")}),Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-workers",children:this.makeCells(9,11,"fourthShiftNumber")})]})}}]),a}(n.Component)),X={TextChange:k},z=Object(m.b)((function(e){return{shifts:e.shifts}}),X)(H),$=(a(56),Object(m.b)()((function(e){var t=e.kmShifts,a=e.id,n=e.onTextChange;return Object(s.jsxs)("tr",{className:"working-shifts__table-row working-shifts__table-row-workers",children:[Object(s.jsx)("td",{className:"working-shifts__table-cell working-shifts__table-cell-worker",colSpan:"3",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:31,value:t[a-100].worker,onChange:function(e){return n(a,t,"worker",e)}})}),Object(s.jsx)("td",{className:"working-shifts__table-cell working-shifts__table-cell-worker",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:6,value:t[a-100].shiftNumber,onChange:function(e){return n(a,t,"shiftNumber",e)}})})]})}))),ee={TextChange:k},te=Object(m.b)((function(e){var t=e.shifts,a=e.kmShifts,s=e.workTeamsNames;return{shifts:t,kmShifts:a,months:e.months,workTeamsNames:s,glTable:e.glTable,kmTable:e.kmTable}}),ee)((function(e){var t=e.shifts,a=e.kmShifts,n=e.months,i=e.workTeamsNames,r=e.glTable,c=e.kmTable,l=e.TextChange,o=function(e,a,n,i,r){for(var c=[],o=0;o<=n;o++)c.push(Object(s.jsx)(z,{shift:t[i],id:r},r));return Object(s.jsx)("table",{className:"working-shifts__table",children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{className:"working-shifts__table-row-header working-shifts__table-row-".concat(e,"-").concat(a),children:[Object(s.jsxs)("th",{className:"working-shifts__table-header\n                                            working-shifts__table-header-hours\n                                            working-shifts__table-header-".concat(e,"-").concat(a),colSpan:"3",children:["\u0421",Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:2,value:e,onChange:function(e){return l(r,t,"startTime",e)}}),"\u0434\u043e",Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:2,value:a,onChange:function(e){return l(r,t,"finishTime",e)}})]}),Object(s.jsx)("th",{className:"working-shifts__table-header-hours-empty"})]}),c]})},r)},d=function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=e.map((function(i){var r=i.id,c=i.nameMaxLength,o=i.shiftNameMaxLength,d="",h=c;return"name"==t?d="name":"teamName"==t?d="teamName":"shiftNumber"==t?d="shiftNumber":"shiftName"==t&&(d="shiftName",h=o),Object(s.jsx)("td",{className:a,colSpan:n,children:Object(s.jsx)("input",{maxLength:h,className:"working-shifts__table-header-value",type:"text",onChange:function(t){return l(r,e,d,t)},value:i[d]})},r)}));return i};return Object(s.jsxs)("div",{className:"working-shifts",children:[Object(s.jsx)("div",{className:"working-shifts__table-month",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:15,onChange:function(e){return l(2,n,"month",e)},value:n[0].month})}),Object(s.jsxs)("div",{className:"working-shifts__table-wrapper working-shifts__table-wrapper-social",children:[Object(s.jsxs)("table",{className:"working-shifts__table",children:[Object(s.jsx)("caption",{className:"working-shifts__table-caption working-shifts__table-caption-social",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:70,onChange:function(e){return l(1,i,"workTeamsName",e)},value:i[0].workTeamsName})}),Object(s.jsxs)("tbody",{children:[Object(s.jsx)("tr",{className:"working-shifts__table-row-header working-shifts__table-row-gl",children:d(r,"name","working-shifts__table-header working-shifts__table-header-gl")}),Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-team",children:d(r,"teamName","working-shifts__table-cell working-shifts__table-cell-team")}),Object(s.jsx)("tr",{className:"working-shifts__table-row working-shifts__table-row-shifts",children:d(r,"shiftNumber","working-shifts__table-cell working-shifts__table-cell-shift")})]})]}),function(e){for(var a=[],s=0;s<=e-1;s++)a.push(o(t[s].startTime,t[s].finishTime,0,s,s+100));return a}(7)]}),Object(s.jsx)("div",{className:"working-shifts__table-wrapper working-shifts__table-wrapper-km",children:Object(s.jsxs)("table",{className:"working-shifts__table",children:[Object(s.jsx)("caption",{className:"working-shifts__table-caption working-shifts__table-caption-km",children:Object(s.jsx)("input",{className:"working-shifts__table-header-value",type:"text",maxLength:35,onChange:function(e){return l(2,i,"workTeamsName",e)},value:i[1].workTeamsName})}),Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{className:"working-shifts__table-row-header working-shifts__table-row-gl",children:[d(c,"name","working-shifts__table-header working-shifts__table-header-gl",3),d(c,"shiftName","working-shifts__table-header working-shifts__table-header-gl")]}),function(e){for(var t=[],n=0;n<e;n++)t.push(Object(s.jsx)($,{kmShifts:a,id:a[n].id,onTextChange:l},a[n].id));return t}(7)]})]})})]},123)})),ae=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.ChangeSelectedPage(this.props.location)}},{key:"componentDidUpdate",value:function(){this.props.ChangeSelectedPage(this.props.location)}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"app",children:[Object(s.jsx)("header",{className:"header",children:Object(s.jsxs)("div",{className:"header__main-nav",children:[Object(s.jsx)("div",{className:"header__main-nav-logo-wrapper",children:Object(s.jsx)(b.b,{className:"header__main-nav-link",to:"/",children:Object(s.jsx)("img",{className:"header__main-nav-logo",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAClCAYAAACqVlhFAAADi0lEQVR4nO3XMWuVZxjG8bsZhOKWxcGv4FeRfBah5jmIg34Yp2IzOBQVqdChKqiDdiidSmdTyCYSb5c3EG4TkjQ557qe5/n/4d5Prh/nPXkjOuhu5C/qz0BLLfLnFpktMtWfZfp2I389wgBFXIvcqxigiDrpmwGKqBb5/CwMUDZUi3x2XgxQ1lyLfHFRDFDWVIv87f9igHLFtcjXl8UA5Yq6zGMKlCvuKr8ZoFyyVeSbdWGAcsFWke/WjQHKOWuRrzaFAcoZtcj3m8YA5ZRa5N8qDFBKq8iXagxQllrkH2oEUJbaBv+bAuWMVpF/qUcHZamt8Q0clAvWIt+qRwZlqUX+ox4XlKVV5J/qUUFZWkV+UI8JylKL/KgeEZSlFnmgHg+UpdbBe8Y0KD289E2D0iL/VY8EytJu5Cf1OKAstY5f+oZDaZFP1WO4nNoifoq8rh7B7aQg6j/e9cAwPDAMDxDDA8PwADE8MAwPEMMDxPDAMDxADA8QwwPE8AAxvAth3In8Uf2BZ7hzg6win6g/7CzH48rwADE8QAwPEMMDxPAAMTxADA8QswPE6HhkGR0/6kbHv71Gx4uh0Z2KAYgZBiBmGICYYQBihgGIGQYgZhiAmGEAYoYBiBkGIGYYgJhhAGKGAYgZBiBmGICYYQBihgGIGQYgZhiAmGEAYoYBiBkGIGYYgJhhAGKGAYgZBiBmGBGAWGFEAGKFEQGIev/vUg8CRkk9Chgl9TBglNTjgFFSDwRGST0SGCX1UGCU1GOBUVIPBkZJPRoYJfVwYJTU44FRUg8IRkk9Ihgl9ZBglNRjglFSDwpGST0qGCX1sGCU1OOCUVIPDEZJPTIYJfXQYJTUY4NRUg8ORkk9Ohgl9fBglNTjg1FSAxy/3NkGRI1wHOPo1JtIU0NUjOlRHDGmRnHFmBbFGWNKFHeM6VB6wJgKpReMaVB6wpgCpTeM4VF6xBgapVeMYVF6xhgSpXeM4VBGwBgKZRSMYVBGwhgCZTSM7lFGxOgaZVSMblFGxugSZXSM7lBmwOgKZRaMblBmwugCZTYMe5QZMaxRZsWwRZkZwxJldgw7lIpxb+vzoXoc2UX8oPaIFvl19m+H3TcFEDMUQMxQADnllL8pgJx8cpCH1/77oh7B7eQo6gEs70FsgeJ2IUR5dHOPR9cJJwE5DqMewPGkKEf9fuv+48PbNw5yZ3uf295Xe9AG+ga6ubMfTCWy0wAAAABJRU5ErkJggg==",alt:"\u041b\u043e\u0433\u043e\u0442\u0438\u043f"})})}),Object(s.jsx)(u.a,{path:"/",component:K})]})}),Object(s.jsxs)("main",{className:"main",children:[Object(s.jsxs)("div",{className:"controls",children:[Object(s.jsx)(u.a,{path:"/",exact:!0,component:q}),Object(s.jsx)(u.a,{path:"/personalschedule/:id",exact:!0,component:x})]}),Object(s.jsxs)("div",{className:"main-content",children:[Object(s.jsx)(u.a,{path:"/",exact:!0,component:B}),Object(s.jsx)(u.a,{path:"/personalschedule/:id",render:function(e){var t=e.match.params.id;return Object(s.jsx)(D,{id:t-1})}}),Object(s.jsx)(u.a,{path:"/seats",component:R}),Object(s.jsx)(u.a,{path:"/workingshifts",component:te})]})]})]})}}]),a}(n.Component),se={ChangeSelectedPage:function(e){return{type:"Change-Selected-Page",location:e}}},ne=Object(m.b)(null,se)(ae),ie=(a(57),function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"error-message",children:"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0443"})})}),re=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(l.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={error:!1},e}return Object(o.a)(a,[{key:"componentDidCatch",value:function(){this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?Object(s.jsx)(ie,{}):this.props.children}}]),a}(n.Component),ce=a(20),le=["\u043f\u043d","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043f\u0442","\u0441\u0431","\u0432\u0441"],oe=[].concat(le,le,le,le,[le[0],le[1]]),de=[],he=1;he<=30;he++)de.push({name:"\u0418\u0432\u0430\u043d\u043e\u0432 \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447 \u2116 ".concat(he),id:he,days:[]});de.forEach((function(e){for(var t=1;t<=30;t++)e.days.push({dayName:oe[t-1],selected:!1,worked:!1,weekend:!1,vacation:!1,workingHours:0,id:t})}));for(var be=de,ue=[],me=function(e,t){var a=e+Math.random()*(t+1-e);return Math.floor(a)},fe=0;fe<=6;fe++)0===fe?ue.push({startTime:"08",finishTime:20,firstShiftNumber:1,secondShiftNumber:2,thirdShiftNumber:1,fourthShiftNumber:2,id:fe+100}):1===fe?ue.push({startTime:"09",finishTime:21,firstShiftNumber:1,secondShiftNumber:2,thirdShiftNumber:1,fourthShiftNumber:2,id:fe+100}):fe<=4?ue.push({startTime:8+fe,finishTime:20+fe,firstShiftNumber:1,secondShiftNumber:2,thirdShiftNumber:1,fourthShiftNumber:2,id:fe+100}):5===fe?ue.push({startTime:14,finishTime:"02",firstShiftNumber:1,secondShiftNumber:2,thirdShiftNumber:1,fourthShiftNumber:2,id:105}):6===fe&&ue.push({startTime:21,finishTime:"09",firstShiftNumber:1,secondShiftNumber:2,thirdShiftNumber:1,fourthShiftNumber:2,id:106});ue.forEach((function(e){for(var t=0;t<=12;t++)e["worker".concat(t)]=me(0,1)?"\u0418\u0432\u0430\u043d\u043e\u0432 \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447":"-"}));for(var je=ue,ke=[],pe=0;pe<=6;pe++)ke.push({worker:me(0,1)?"\u0418\u0432\u0430\u043d\u043e\u0432 \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447":"-",shiftNumber:1,id:pe+100});var we={workers:be,selectedWorker:0,selectedDay:0,filter:"all",allActive:!0,workedActive:!1,weekendsActive:!1,vacationActive:!1,shifts:je,glTable:[{name:"\u0413\u0440\u0443\u043f\u043f-\u043b\u0438\u0434\u0435\u0440 1",teamName:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430 1",shiftNumber:"\u0421\u043c\u0435\u043d\u0430 1",nameMaxLength:31,id:1001},{name:"\u0413\u0440\u0443\u043f\u043f-\u043b\u0438\u0434\u0435\u0440 2",teamName:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430 2",shiftNumber:"\u0421\u043c\u0435\u043d\u0430 2",nameMaxLength:31,id:1002},{name:"\u0413\u0440\u0443\u043f\u043f-\u043b\u0438\u0434\u0435\u0440 3",teamName:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430 3",shiftNumber:"\u0421\u043c\u0435\u043d\u0430 1 \u0438 2",nameMaxLength:31,id:1003},{name:"\u2116 \u0421\u043c\u0435\u043d\u044b",teamName:"1",shiftNumber:"2",nameMaxLength:6,id:1004}],kmTable:[{name:"\u0413\u0440\u0443\u043f\u043f-\u043b\u0438\u0434\u0435\u0440",shiftName:"\u2116 \u0421\u043c\u0435\u043d\u044b",nameMaxLength:31,shiftNameMaxLength:6,id:1005}],kmShifts:ke,workTeamsNames:[{workTeamsName:"\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0421\u0435\u0442\u0438",id:1},{workTeamsName:"\u041a\u041c",id:2}],months:[{month:"\u0410\u043f\u0440\u0435\u043b\u044c",id:4}],seats:[{oldIp:"10.120.170.251",newIp:"10.120.110.11",seatNumber:"3019.66 (129)",id:10},{oldIp:"10.120.170.111",newIp:"10.120.119.221",seatNumber:"3019.65 (127)",id:11},{oldIp:"10.120.171.86",newIp:"10.120.110.20",seatNumber:"3019.64 (126)",id:12},{oldIp:"10.120.171.172",newIp:"10.120.119.155",seatNumber:"3019.63 (122)",id:13},{oldIp:"10.120.170.189",newIp:"10.120.119.208",seatNumber:"3019.62 (120)",id:14},{oldIp:"10.120.173.121",newIp:"10.120.119.199",seatNumber:"3019.61 (119)",id:15},{oldIp:"10.120.173.122",newIp:"10.120.193.192",seatNumber:"3019.60 (118)",id:16},{oldIp:"10.120.173.123",newIp:"10.120.193.193",seatNumber:"3019.59 (117)",id:17},{oldIp:"10.120.173.124",newIp:"10.120.193.194",seatNumber:"3019.58 (116)",id:18},{oldIp:"10.120.173.125",newIp:"10.120.193.195",seatNumber:"3019.57 (115)",id:19},{oldIp:"10.120.173.126",newIp:"10.120.193.196",seatNumber:"3019.56 (114)",id:20},{oldIp:"10.120.173.127",newIp:"10.120.193.197",seatNumber:"3019.55 (113)",id:21},{oldIp:"10.120.173.128",newIp:"10.120.193.198",seatNumber:"3019.54 (112)",id:22},{oldIp:"10.120.173.123",newIp:"10.120.193.193",seatNumber:"3019.59 (117)",id:23},{oldIp:"10.120.173.124",newIp:"10.120.193.194",seatNumber:"3019.58 (116)",id:24},{oldIp:"10.120.173.125",newIp:"10.120.193.195",seatNumber:"3019.57 (115)",id:25},{oldIp:"10.120.173.126",newIp:"10.120.193.196",seatNumber:"3019.56 (114)",id:26},{oldIp:"10.120.173.127",newIp:"10.120.193.197",seatNumber:"3019.55 (113)",id:27},{oldIp:"10.120.173.128",newIp:"10.120.193.198",seatNumber:"3019.54 (112)",id:28},{oldIp:"10.120.173.123",newIp:"10.120.193.193",seatNumber:"3019.59 (117)",id:29},{oldIp:"10.120.173.124",newIp:"10.120.193.194",seatNumber:"3019.58 (116)",id:30},{oldIp:"10.120.173.125",newIp:"10.120.193.195",seatNumber:"3019.57 (115)",id:31},{oldIp:"10.120.173.126",newIp:"10.120.193.196",seatNumber:"3019.56 (114)",id:32},{oldIp:"10.120.173.127",newIp:"10.120.193.197",seatNumber:"3019.55 (113)",id:33},{oldIp:"10.120.173.128",newIp:"10.120.193.198",seatNumber:"3019.54 (112)",id:34}],scheduleActive:!0,seatsActive:!1,workingshiftsActive:!1},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Select-Worker":return Object(A.a)(Object(A.a)({},e),{},{selectedWorker:t.id});case"Clear-All-Days":var a=Object(y.a)(e.workers);return a.forEach((function(e){e.days.forEach((function(e){e.selected=!1}))})),Object(A.a)(Object(A.a)({},e),{},{workers:a});case"Change-Day-Type":if(0===t.workerId||0===t.dayId)return Object(A.a)({},e);var s=e.workers,n=s.findIndex((function(e){return e.id===t.workerId})),i=s[n].days.findIndex((function(e){return e.id===t.dayId})),r=s[n].days[i],c=Object(A.a)({},r);c[t.objKey]=!r[t.objKey];var l=[].concat(Object(y.a)(s[n].days.slice(0,i)),[c],Object(y.a)(s[n].days.slice(i+1))),o=Object(A.a)(Object(A.a)({},s[n]),{},{days:l}),d=[].concat(Object(y.a)(s.slice(0,n)),[o],Object(y.a)(s.slice(n+1)));return"worked"===t.objKey?(d[n].days[i].weekend=!1,d[n].days[i].vacation=!1):"weekend"===t.objKey?(d[n].days[i].worked=!1,d[n].days[i].vacation=!1):"vacation"===t.objKey&&(d[n].days[i].worked=!1,d[n].days[i].weekend=!1),"common"===t.scheduleType&&("worked"===t.objKey?d.forEach((function(e){e.days.forEach((function(e){e.selected&&(e.worked=!0,e.weekend=!1,e.vacation=!1,e.selected=!1)}))})):"weekend"===t.objKey?d.forEach((function(e){e.days.forEach((function(e){e.selected&&(e.weekend=!0,e.worked=!1,e.vacation=!1,e.selected=!1)}))})):"vacation"===t.objKey?d.forEach((function(e){e.days.forEach((function(e){e.selected&&(e.vacation=!0,e.worked=!1,e.weekend=!1,e.selected=!1)}))})):"clear"===t.objKey&&d.forEach((function(e){e.days.forEach((function(e){e.selected&&(e.vacation=!1,e.worked=!1,e.weekend=!1,e.selected=!1)}))}))),"personal"===t.scheduleType&&"selected"===t.objKey&&d[n].days.forEach((function(e){e.id!==i+1&&(e[t.objKey]=!1)})),Object(A.a)(Object(A.a)({},e),{},{workers:d});case"Filter-Select":return Object(A.a)(Object(A.a)({},e),{},{filter:t.filter,allActive:!0,workedActive:!1,weekendsActive:!1,vacationActive:!1});case"Make-Filter-Active":if(-1===t.id)return Object(A.a)(Object(A.a)({},e),{},{allActive:!0,workedActive:!1,weekendsActive:!1,vacationActive:!1});if(-2===t.id)return Object(A.a)(Object(A.a)({},e),{},{workedActive:!0,allActive:!1,weekendsActive:!1,vacationActive:!1});if(-3===t.id)return Object(A.a)(Object(A.a)({},e),{},{weekendsActive:!0,workedActive:!1,allActive:!1,vacationActive:!1});if(-4===t.id)return Object(A.a)(Object(A.a)({},e),{},{vacationActive:!0,workedActive:!1,allActive:!1,weekendsActive:!1});break;case"Select-Day":return Object(A.a)(Object(A.a)({},e),{},{selectedWorker:t.selectedWorker,selectedDay:t.selectedDay});case"Text-Change":var h=t.dataArr.findIndex((function(e){return e.id===t.id})),b=t.dataArr[h],u=Object(A.a)({},b);u[t.objKey]=t.e.target.value;var m=[].concat(Object(y.a)(t.dataArr.slice(0,h)),[u],Object(y.a)(t.dataArr.slice(h+1)));if(t.dataArr===e.shifts)return Object(A.a)(Object(A.a)({},e),{},{shifts:m});if(t.dataArr===e.glTable)return Object(A.a)(Object(A.a)({},e),{},{glTable:m});if(t.dataArr===e.kmShifts)return Object(A.a)(Object(A.a)({},e),{},{kmShifts:m});if(t.dataArr===e.kmTable)return Object(A.a)(Object(A.a)({},e),{},{kmTable:m});if(t.dataArr===e.workTeamsNames)return Object(A.a)(Object(A.a)({},e),{},{workTeamsNames:m});if(t.dataArr===e.months)return Object(A.a)(Object(A.a)({},e),{},{months:m});break;case"Change-Seat-Text":var f=e.seats.findIndex((function(e){return e.id===t.id})),j=e.seats[f],k=Object(A.a)(Object(A.a)({},j),{},{oldIp:t.NewOldIp,newIp:t.NewNewIp,seatNumber:t.NewSeatNumber}),p=[].concat(Object(y.a)(e.seats.slice(0,f)),[k],Object(y.a)(e.seats.slice(f+1)));return Object(A.a)(Object(A.a)({},e),{},{seats:p});case"Make-Active-Nav-Btn":if("scheduleBtn"===t.btnName)return Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!0,seatsActive:!1,workingshiftsActive:!1});if("seatsBtn"===t.btnName)return Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!1,workingshiftsActive:!1,seatsActive:!0});if("workingshiftsBtn"===t.btnName)return Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!1,seatsActive:!1,workingshiftsActive:!0});break;case"Change-Selected-Page":return"/seats/"===t.location.pathname?Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!1,workingshiftsActive:!1,seatsActive:!0}):"/workingshifts/"===t.location.pathname?Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!1,workingshiftsActive:!0,seatsActive:!1}):"/"===t.location.pathname?Object(A.a)(Object(A.a)({},e),{},{scheduleActive:!0,workingshiftsActive:!1,seatsActive:!1}):Object(A.a)({},e);default:return e}},ge=Object(ce.b)(ve);c.a.render(Object(s.jsx)(m.a,{store:ge,children:Object(s.jsx)(re,{children:Object(s.jsx)(b.a,{children:Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(u.a,{path:"/",render:function(e){var t=e.location;return Object(s.jsx)(ne,{location:t})}})})})})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.9f56a689.chunk.js.map