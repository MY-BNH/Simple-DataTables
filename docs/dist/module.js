const t=t=>"[object Object]"===Object.prototype.toString.call(t),e=(t,e)=>{const s=document.createElement(t);if(e&&"object"==typeof e)for(const t in e)"html"===t?s.innerHTML=e[t]:s.setAttribute(t,e[t]);return s},s=t=>{t instanceof NodeList?t.forEach((t=>s(t))):t.innerHTML=""},i=(t,s,i)=>e("li",{class:t,html:`<a href="#" data-page="${s}">${i}</a>`}),a=(t,e)=>{let s,i;1===e?(s=0,i=t.length):-1===e&&(s=t.length-1,i=-1);for(let a=!0;a;){a=!1;for(let n=s;n!=i;n+=e)if(t[n+e]&&t[n].value>t[n+e].value){const s=t[n],i=t[n+e],r=s;t[n]=i,t[n+e]=r,a=!0}}return t};class n{constructor(t,e){return this.dt=t,this.rows=e,this}build(t){const s=e("tr");let i=this.dt.headings;return i.length||(i=t.map((()=>""))),i.forEach(((i,a)=>{const n=e("td");t[a]&&t[a].length||(t[a]=""),n.innerHTML=t[a],n.data=t[a],s.appendChild(n)})),s}render(t){return t}add(t){if(Array.isArray(t)){const e=this.dt;Array.isArray(t[0])?t.forEach((t=>{e.data.push(this.build(t))})):e.data.push(this.build(t)),e.data.length&&(e.hasRows=!0),this.update(),e.columns().rebuild()}}remove(t){const e=this.dt;Array.isArray(t)?(t.sort(((t,e)=>e-t)),t.forEach((t=>{e.data.splice(t,1)}))):"all"==t?e.data=[]:e.data.splice(t,1),e.data.length||(e.hasRows=!1),this.update(),e.columns().rebuild()}update(){this.dt.data.forEach(((t,e)=>{t.dataIndex=e}))}}class r{constructor(t){return this.dt=t,this}swap(t){if(t.length&&2===t.length){const e=[];this.dt.headings.forEach(((t,s)=>{e.push(s)}));const s=t[0],i=t[1],a=e[i];e[i]=e[s],e[s]=a,this.order(e)}}order(t){let e,s,i,a,n,r,h;const o=[[],[],[],[]],l=this.dt;t.forEach(((t,i)=>{n=l.headings[t],r="false"!==n.getAttribute("data-sortable"),e=n.cloneNode(!0),e.originalCellIndex=i,e.sortable=r,o[0].push(e),l.hiddenColumns.includes(t)||(s=n.cloneNode(!0),s.originalCellIndex=i,s.sortable=r,o[1].push(s))})),l.data.forEach(((e,s)=>{i=e.cloneNode(!1),a=e.cloneNode(!1),i.dataIndex=a.dataIndex=s,null!==e.searchIndex&&void 0!==e.searchIndex&&(i.searchIndex=a.searchIndex=e.searchIndex),t.forEach((t=>{h=e.cells[t].cloneNode(!0),h.data=e.cells[t].data,i.appendChild(h),l.hiddenColumns.includes(t)||(h=e.cells[t].cloneNode(!0),h.data=e.cells[t].data,a.appendChild(h))})),o[2].push(i),o[3].push(a)})),l.headings=o[0],l.activeHeadings=o[1],l.data=o[2],l.activeRows=o[3],l.update()}hide(t){if(t.length){const e=this.dt;t.forEach((t=>{e.hiddenColumns.includes(t)||e.hiddenColumns.push(t)})),this.rebuild()}}show(t){if(t.length){let e;const s=this.dt;t.forEach((t=>{e=s.hiddenColumns.indexOf(t),e>-1&&s.hiddenColumns.splice(e,1)})),this.rebuild()}}visible(t){let e;const s=this.dt;return t=t||s.headings.map((t=>t.originalCellIndex)),isNaN(t)?Array.isArray(t)&&(e=[],t.forEach((t=>{e.push(!s.hiddenColumns.includes(t))}))):e=!s.hiddenColumns.includes(t),e}add(t){let e;const s=document.createElement("th");if(!this.dt.headings.length)return this.dt.insert({headings:[t.heading],data:t.data.map((t=>[t]))}),void this.rebuild();this.dt.hiddenHeader?s.innerHTML="":t.heading.nodeName?s.appendChild(t.heading):s.innerHTML=t.heading,this.dt.headings.push(s),this.dt.data.forEach(((s,i)=>{t.data[i]&&(e=document.createElement("td"),t.data[i].nodeName?e.appendChild(t.data[i]):e.innerHTML=t.data[i],e.data=e.innerHTML,t.render&&(e.innerHTML=t.render.call(this,e.data,e,s)),s.appendChild(e))})),t.type&&s.setAttribute("data-type",t.type),t.format&&s.setAttribute("data-format",t.format),t.hasOwnProperty("sortable")&&(s.sortable=t.sortable,s.setAttribute("data-sortable",!0===t.sortable?"true":"false")),this.rebuild(),this.dt.renderHeader()}remove(t){Array.isArray(t)?(t.sort(((t,e)=>e-t)),t.forEach((t=>this.remove(t)))):(this.dt.headings.splice(t,1),this.dt.data.forEach((e=>{e.removeChild(e.cells[t])}))),this.rebuild()}filter(t,e,s,i){const a=this.dt;if(a.filterState||(a.filterState={originalData:a.data}),!a.filterState[t]){const e=[...i,()=>!0];a.filterState[t]=function(){let t=0;return()=>e[t++%e.length]}()}const n=a.filterState[t](),r=Array.from(a.filterState.originalData).filter((e=>{const s=e.cells[t],i=s.hasAttribute("data-content")?s.getAttribute("data-content"):s.innerText;return"function"==typeof n?n(i):i===n}));a.data=r,a.data.length?(this.rebuild(),a.update()):(a.clear(),a.setMessage(a.options.labels.noRows)),s||a.emit("datatable.sort",t,e)}sort(t,e,s){const i=this.dt;if(i.hasHeadings&&(t<0||t>i.headings.length))return!1;const n=i.options.filters&&i.options.filters[i.headings[t].textContent];if(n&&0!==n.length)return void this.filter(t,e,s,n);i.sorting=!0,s||i.emit("datatable.sorting",t,e);let r=i.data;const h=[],o=[];let l=0,d=0;const c=i.headings[t],u=[];if("date"===c.getAttribute("data-type")){let t=!1;c.hasAttribute("data-format")&&(t=c.getAttribute("data-format")),u.push(Promise.resolve().then((function(){return p})).then((({parseDate:e})=>s=>e(s,t))))}Promise.all(u).then((n=>{const u=n[0];let p,f;Array.from(r).forEach((e=>{const s=e.cells[t],i=s.hasAttribute("data-content")?s.getAttribute("data-content"):s.innerText;let a;a=u?u(i):"string"==typeof i?i.replace(/(\$|,|\s|%)/g,""):i,parseFloat(a)==a?o[d++]={value:Number(a),row:e}:h[l++]={value:"string"==typeof i?i.toLowerCase():i,row:e}})),e||(e=c.classList.contains("asc")?"desc":"asc"),"desc"==e?(p=a(h,-1),f=a(o,-1),c.classList.remove("asc"),c.classList.add("desc")):(p=a(o,1),f=a(h,1),c.classList.remove("desc"),c.classList.add("asc")),i.lastTh&&c!=i.lastTh&&(i.lastTh.classList.remove("desc"),i.lastTh.classList.remove("asc")),i.lastTh=c,r=p.concat(f),i.data=[];const g=[];r.forEach(((t,e)=>{i.data.push(t.row),null!==t.row.searchIndex&&void 0!==t.row.searchIndex&&g.push(e)})),i.searchData=g,this.rebuild(),i.update(),s||i.emit("datatable.sort",t,e)}))}rebuild(){let t,e,s,i;const a=this.dt,n=[];a.activeRows=[],a.activeHeadings=[],a.headings.forEach(((t,e)=>{t.originalCellIndex=e,t.sortable="false"!==t.getAttribute("data-sortable"),a.hiddenColumns.includes(e)||a.activeHeadings.push(t)})),a.data.forEach(((r,h)=>{t=r.cloneNode(!1),e=r.cloneNode(!1),t.dataIndex=e.dataIndex=h,null!==r.searchIndex&&void 0!==r.searchIndex&&(t.searchIndex=e.searchIndex=r.searchIndex),Array.from(r.cells).forEach((n=>{s=n.cloneNode(!0),s.data=n.data,t.appendChild(s),a.hiddenColumns.includes(s.cellIndex)||(i=s.cloneNode(!0),i.data=s.data,e.appendChild(i))})),n.push(t),a.activeRows.push(e)})),a.data=n,a.update()}}const h=function(t){let s=!1,i=!1;if((t=t||this.options.data).headings){s=e("thead");const i=e("tr");t.headings.forEach((t=>{const s=e("th",{html:t});i.appendChild(s)})),s.appendChild(i)}t.data&&t.data.length&&(i=e("tbody"),t.data.forEach((s=>{if(t.headings&&t.headings.length!==s.length)throw new Error("The number of rows do not match the number of headings.");const a=e("tr");s.forEach((t=>{const s=e("td",{html:t});a.appendChild(s)})),i.appendChild(a)}))),s&&(null!==this.dom.tHead&&this.dom.removeChild(this.dom.tHead),this.dom.appendChild(s)),i&&(this.dom.tBodies.length&&this.dom.removeChild(this.dom.tBodies[0]),this.dom.appendChild(i))},o={sortable:!0,searchable:!0,paging:!0,perPage:10,perPageSelect:[5,10,15,20,25],nextPrev:!0,firstLast:!1,prevText:"&lsaquo;",nextText:"&rsaquo;",firstText:"&laquo;",lastText:"&raquo;",ellipsisText:"&hellip;",ascText:"▴",descText:"▾",truncatePager:!0,pagerDelta:2,scrollY:"",fixedColumns:!0,fixedHeight:!1,header:!0,hiddenHeader:!1,footer:!1,labels:{placeholder:"Search...",perPage:"{select} entries per page",noRows:"No entries found",info:"Showing {start} to {end} of {rows} entries"},layout:{top:"{select}{search}",bottom:"{info}{pager}"}};class l{constructor(t,e={}){this.initialized=!1,this.options={...o,...e,layout:{...o.layout,...e.layout},labels:{...o.labels,...e.labels}};const s="string"==typeof t?document.querySelector(t):t;if(this.initialLayout=s.innerHTML,this.initialSortable=this.options.sortable,this.options.header||(this.options.sortable=!1),null===s.tHead&&(!this.options.data||this.options.data&&!this.options.data.headings)&&(this.options.sortable=!1),s.tBodies.length&&!s.tBodies[0].rows.length&&this.options.data&&!this.options.data.data)throw new Error("You seem to be using the data option, but you've not defined any rows.");this.dom=s,this.listeners={onResize:t=>this.onResize(t)},this.init()}static extend(t,e){"function"==typeof e?l.prototype[t]=e:l[t]=e}init(t){if(this.initialized||this.dom.classList.contains("dataTable-table"))return!1;Object.assign(this.options,t||{}),this.currentPage=1,this.onFirstPage=!0,this.hiddenColumns=[],this.columnRenderers=[],this.selectedColumns=[],this.render(),setTimeout((()=>{this.emit("datatable.init"),this.initialized=!0,this.options.plugins&&Object.entries(this.options.plugins).forEach((([t,s])=>{this[t]&&"function"==typeof this[t]&&(this[t]=this[t](s,{createElement:e}),s.enabled&&this[t].init&&"function"==typeof this[t].init&&this[t].init())}))}),10)}render(t){if(t){switch(t){case"page":this.renderPage();break;case"pager":this.renderPager();break;case"header":this.renderHeader()}return!1}const s=this.options;let i="";if(s.data&&h.call(this),this.body=this.dom.tBodies[0],this.head=this.dom.tHead,this.foot=this.dom.tFoot,this.body||(this.body=e("tbody"),this.dom.appendChild(this.body)),this.hasRows=this.body.rows.length>0,!this.head){const t=e("thead"),i=e("tr");this.hasRows&&(Array.from(this.body.rows[0].cells).forEach((()=>{i.appendChild(e("th"))})),t.appendChild(i)),this.head=t,this.dom.insertBefore(this.head,this.body),this.hiddenHeader=s.hiddenHeader}if(this.headings=[],this.hasHeadings=this.head.rows.length>0,this.hasHeadings&&(this.header=this.head.rows[0],this.headings=[].slice.call(this.header.cells)),s.header||this.head&&this.dom.removeChild(this.dom.tHead),s.footer?this.head&&!this.foot&&(this.foot=e("tfoot",{html:this.head.innerHTML}),this.dom.appendChild(this.foot)):this.foot&&this.dom.removeChild(this.dom.tFoot),this.wrapper=e("div",{class:"dataTable-wrapper dataTable-loading"}),i+="<div class='dataTable-top'>",i+=s.layout.top,i+="</div>",s.scrollY.length?i+=`<div class='dataTable-container' style='height: ${s.scrollY}; overflow-Y: auto;'></div>`:i+="<div class='dataTable-container'></div>",i+="<div class='dataTable-bottom'>",i+=s.layout.bottom,i+="</div>",i=i.replace("{info}",s.paging?"<div class='dataTable-info'></div>":""),s.paging&&s.perPageSelect){let t="<div class='dataTable-dropdown'><label>";t+=s.labels.perPage,t+="</label></div>";const a=e("select",{class:"dataTable-selector"});s.perPageSelect.forEach((t=>{const e=t===s.perPage,i=new Option(t,t,e,e);a.add(i)})),t=t.replace("{select}",a.outerHTML),i=i.replace("{select}",t)}else i=i.replace("{select}","");if(s.searchable){const t=`<div class='dataTable-search'><input class='dataTable-input' placeholder='${s.labels.placeholder}' type='text'></div>`;i=i.replace("{search}",t)}else i=i.replace("{search}","");this.hasHeadings&&this.render("header"),this.dom.classList.add("dataTable-table");const a=e("nav",{class:"dataTable-pagination"}),n=e("ul",{class:"dataTable-pagination-list"});a.appendChild(n),i=i.replace(/\{pager\}/g,a.outerHTML),this.wrapper.innerHTML=i,this.container=this.wrapper.querySelector(".dataTable-container"),this.pagers=this.wrapper.querySelectorAll(".dataTable-pagination-list"),this.label=this.wrapper.querySelector(".dataTable-info"),this.dom.parentNode.replaceChild(this.wrapper,this.dom),this.container.appendChild(this.dom),this.rect=this.dom.getBoundingClientRect(),this.data=Array.from(this.body.rows),this.activeRows=this.data.slice(),this.activeHeadings=this.headings.slice(),this.update(),this.setColumns(),this.fixHeight(),this.fixColumns(),s.header||this.wrapper.classList.add("no-header"),s.footer||this.wrapper.classList.add("no-footer"),s.sortable&&this.wrapper.classList.add("sortable"),s.searchable&&this.wrapper.classList.add("searchable"),s.fixedHeight&&this.wrapper.classList.add("fixed-height"),s.fixedColumns&&this.wrapper.classList.add("fixed-columns"),this.bindEvents()}renderPage(){if(this.hasHeadings&&(s(this.header),this.activeHeadings.forEach((t=>this.header.appendChild(t)))),this.hasRows&&this.totalPages){this.currentPage>this.totalPages&&(this.currentPage=1);const t=this.currentPage-1,e=document.createDocumentFragment();this.pages[t].forEach((t=>e.appendChild(this.rows().render(t)))),this.clear(e),this.onFirstPage=1===this.currentPage,this.onLastPage=this.currentPage===this.lastPage}else this.setMessage(this.options.labels.noRows);let t,e=0,i=0,a=0;if(this.totalPages&&(e=this.currentPage-1,i=e*this.options.perPage,a=i+this.pages[e].length,i+=1,t=this.searching?this.searchData.length:this.data.length),this.label&&this.options.labels.info.length){const e=this.options.labels.info.replace("{start}",i).replace("{end}",a).replace("{page}",this.currentPage).replace("{pages}",this.totalPages).replace("{rows}",t);this.label.innerHTML=t?e:""}1==this.currentPage&&this.fixHeight()}renderPager(){if(s(this.pagers),this.totalPages>1){const t="pager",s=document.createDocumentFragment(),a=this.onFirstPage?1:this.currentPage-1,n=this.onLastPage?this.totalPages:this.currentPage+1;this.options.firstLast&&s.appendChild(i(t,1,this.options.firstText)),this.options.nextPrev&&s.appendChild(i(t,a,this.options.prevText));let r=this.links;this.options.truncatePager&&(r=((t,s,i,a,n)=>{let r;const h=2*(a=a||2);let o=s-a,l=s+a;const d=[],c=[];s<4-a+h?l=3+h:s>i-(3-a+h)&&(o=i-(2+h));for(let e=1;e<=i;e++)if(1==e||e==i||e>=o&&e<=l){const s=t[e-1];s.classList.remove("active"),d.push(s)}return d.forEach((s=>{const i=s.children[0].getAttribute("data-page");if(r){const s=r.children[0].getAttribute("data-page");if(i-s==2)c.push(t[s]);else if(i-s!=1){const t=e("li",{class:"ellipsis",html:`<a href="#">${n}</a>`});c.push(t)}}c.push(s),r=s})),c})(this.links,this.currentPage,this.pages.length,this.options.pagerDelta,this.options.ellipsisText)),this.links[this.currentPage-1].classList.add("active"),r.forEach((t=>{t.classList.remove("active"),s.appendChild(t)})),this.links[this.currentPage-1].classList.add("active"),this.options.nextPrev&&s.appendChild(i(t,n,this.options.nextText)),this.options.firstLast&&s.appendChild(i(t,this.totalPages,this.options.lastText)),this.pagers.forEach((t=>{t.appendChild(s.cloneNode(!0))}))}}renderHeader(){this.labels=[],this.headings&&this.headings.length&&this.headings.forEach(((t,s)=>{if(this.labels[s]=t.textContent,t.firstElementChild&&t.firstElementChild.classList.contains("dataTable-sorter")&&(t.innerHTML=t.firstElementChild.innerHTML),t.sortable="false"!==t.getAttribute("data-sortable"),t.originalCellIndex=s,this.options.sortable&&t.sortable){const s=e("a",{href:"#",class:"dataTable-sorter",html:t.innerHTML});t.innerHTML="",t.setAttribute("data-sortable",""),t.appendChild(s)}})),this.fixColumns()}bindEvents(){const t=this.options;if(t.perPageSelect){const e=this.wrapper.querySelector(".dataTable-selector");e&&e.addEventListener("change",(()=>{t.perPage=parseInt(e.value,10),this.update(),this.fixHeight(),this.emit("datatable.perpage",t.perPage)}),!1)}t.searchable&&(this.input=this.wrapper.querySelector(".dataTable-input"),this.input&&this.input.addEventListener("keyup",(()=>this.search(this.input.value)),!1)),this.wrapper.addEventListener("click",(e=>{const s=e.target.closest("a");s&&"a"===s.nodeName.toLowerCase()&&(s.hasAttribute("data-page")?(this.page(s.getAttribute("data-page")),e.preventDefault()):t.sortable&&s.classList.contains("dataTable-sorter")&&"false"!=s.parentNode.getAttribute("data-sortable")&&(this.columns().sort(this.headings.indexOf(s.parentNode)),e.preventDefault()))}),!1),window.addEventListener("resize",this.listeners.onResize)}onResize(){this.rect=this.container.getBoundingClientRect(),this.rect.width&&this.fixColumns()}setColumns(t){t||this.data.forEach((t=>{Array.from(t.cells).forEach((t=>{t.data=t.innerHTML}))})),this.options.columns&&this.headings.length&&this.options.columns.forEach((t=>{Array.isArray(t.select)||(t.select=[t.select]),t.hasOwnProperty("render")&&"function"==typeof t.render&&(this.selectedColumns=this.selectedColumns.concat(t.select),this.columnRenderers.push({columns:t.select,renderer:t.render})),t.select.forEach((e=>{const s=this.headings[e];t.type&&s.setAttribute("data-type",t.type),t.format&&s.setAttribute("data-format",t.format),t.hasOwnProperty("sortable")&&s.setAttribute("data-sortable",t.sortable),t.hasOwnProperty("hidden")&&!1!==t.hidden&&this.columns().hide([e]),t.hasOwnProperty("sort")&&1===t.select.length&&this.columns().sort(t.select[0],t.sort,!0)}))})),this.hasRows&&(this.data.forEach(((t,e)=>{t.dataIndex=e,Array.from(t.cells).forEach((t=>{t.data=t.innerHTML}))})),this.selectedColumns.length&&this.data.forEach((t=>{Array.from(t.cells).forEach(((e,s)=>{this.selectedColumns.includes(s)&&this.columnRenderers.forEach((i=>{i.columns.includes(s)&&(e.innerHTML=i.renderer.call(this,e.data,e,t))}))}))})),this.columns().rebuild()),this.render("header")}destroy(){this.dom.innerHTML=this.initialLayout,this.dom.classList.remove("dataTable-table"),this.wrapper.parentNode.replaceChild(this.dom,this.wrapper),this.initialized=!1,window.removeEventListener("resize",this.listeners.onResize)}update(){this.wrapper.classList.remove("dataTable-empty"),this.paginate(this),this.render("page"),this.links=[];let t=this.pages.length;for(;t--;){const e=t+1;this.links[t]=i(0===t?"active":"",e,e)}this.sorting=!1,this.render("pager"),this.rows().update(),this.emit("datatable.update")}paginate(){const t=this.options.perPage;let e=this.activeRows;return this.searching&&(e=[],this.searchData.forEach((t=>e.push(this.activeRows[t])))),this.options.paging?this.pages=e.map(((s,i)=>i%t==0?e.slice(i,i+t):null)).filter((t=>t)):this.pages=[e],this.totalPages=this.lastPage=this.pages.length,this.totalPages}fixColumns(){if((this.options.scrollY.length||this.options.fixedColumns)&&this.activeHeadings&&this.activeHeadings.length){let t,s=!1;if(this.columnWidths=[],this.dom.tHead){if(this.options.scrollY.length&&(s=e("thead"),s.appendChild(e("tr")),s.style.height="0px",this.headerTable&&(this.dom.tHead=this.headerTable.tHead)),this.activeHeadings.forEach((t=>{t.style.width=""})),this.activeHeadings.forEach(((t,i)=>{const a=t.offsetWidth,n=a/this.rect.width*100;if(t.style.width=`${n}%`,this.columnWidths[i]=a,this.options.scrollY.length){const t=e("th");s.firstElementChild.appendChild(t),t.style.width=`${n}%`,t.style.paddingTop="0",t.style.paddingBottom="0",t.style.border="0"}})),this.options.scrollY.length){const t=this.dom.parentElement;if(!this.headerTable){this.headerTable=e("table",{class:"dataTable-table"});const s=e("div",{class:"dataTable-headercontainer"});s.appendChild(this.headerTable),t.parentElement.insertBefore(s,t)}const i=this.dom.tHead;this.dom.replaceChild(s,i),this.headerTable.tHead=i,this.headerTable.parentElement.style.paddingRight=`${this.headerTable.clientWidth-this.dom.clientWidth+parseInt(this.headerTable.parentElement.style.paddingRight||"0",10)}px`,t.scrollHeight>t.clientHeight&&(t.style.overflowY="scroll")}}else{t=[],s=e("thead");const i=e("tr");Array.from(this.dom.tBodies[0].rows[0].cells).forEach((()=>{const s=e("th");i.appendChild(s),t.push(s)})),s.appendChild(i),this.dom.insertBefore(s,this.body);const a=[];t.forEach(((t,e)=>{const s=t.offsetWidth,i=s/this.rect.width*100;a.push(i),this.columnWidths[e]=s})),this.data.forEach((t=>{Array.from(t.cells).forEach(((t,e)=>{this.columns(t.cellIndex).visible()&&(t.style.width=`${a[e]}%`)}))})),this.dom.removeChild(s)}}}fixHeight(){this.options.fixedHeight&&(this.container.style.height=null,this.rect=this.container.getBoundingClientRect(),this.container.style.height=`${this.rect.height}px`)}search(t){return!!this.hasRows&&(t=t.toLowerCase(),this.currentPage=1,this.searching=!0,this.searchData=[],t.length?(this.clear(),this.data.forEach(((e,s)=>{const i=this.searchData.includes(e);t.split(" ").reduce(((t,s)=>{let i=!1,a=null,n=null;for(let t=0;t<e.cells.length;t++)if(a=e.cells[t],n=a.hasAttribute("data-content")?a.getAttribute("data-content"):a.textContent,n.toLowerCase().includes(s)&&this.columns(a.cellIndex).visible()){i=!0;break}return t&&i}),!0)&&!i?(e.searchIndex=s,this.searchData.push(s)):e.searchIndex=null})),this.wrapper.classList.add("search-results"),this.searchData.length?this.update():(this.wrapper.classList.remove("search-results"),this.setMessage(this.options.labels.noRows)),void this.emit("datatable.search",t,this.searchData)):(this.searching=!1,this.update(),this.emit("datatable.search",t,this.searchData),this.wrapper.classList.remove("search-results"),!1))}page(t){return t!=this.currentPage&&(isNaN(t)||(this.currentPage=parseInt(t,10)),!(t>this.pages.length||t<0)&&(this.render("page"),this.render("pager"),void this.emit("datatable.page",t)))}sortColumn(t,e){this.columns().sort(t,e)}insert(s){let i=[];if(t(s)){if(s.headings&&!this.hasHeadings&&!this.hasRows){const t=e("tr");s.headings.forEach((s=>{const i=e("th",{html:s});t.appendChild(i)})),this.head.appendChild(t),this.header=t,this.headings=[].slice.call(t.cells),this.hasHeadings=!0,this.options.sortable=this.initialSortable,this.render("header"),this.activeHeadings=this.headings.slice()}s.data&&Array.isArray(s.data)&&(i=s.data)}else Array.isArray(s)&&s.forEach((t=>{const e=[];Object.entries(t).forEach((([t,s])=>{const i=this.labels.indexOf(t);i>-1&&(e[i]=s)})),i.push(e)}));i.length&&(this.rows().add(i),this.hasRows=!0),this.update(),this.setColumns(),this.fixColumns()}refresh(){this.options.searchable&&(this.input.value="",this.searching=!1),this.currentPage=1,this.onFirstPage=!0,this.update(),this.emit("datatable.refresh")}clear(t){this.body&&s(this.body);let e=this.body;if(this.body||(e=this.dom),t){if("string"==typeof t){document.createDocumentFragment().innerHTML=t}e.appendChild(t)}}export(e){if(!this.hasHeadings&&!this.hasRows)return!1;const s=this.activeHeadings;let i=[];const a=[];let n,r,h,o;if(!t(e))return!1;const l={download:!0,skipColumn:[],lineDelimiter:"\n",columnDelimiter:",",tableName:"myTable",replacer:null,space:4,...e};if(l.type){if("txt"!==l.type&&"csv"!==l.type||(i[0]=this.header),l.selection)if(isNaN(l.selection)){if(Array.isArray(l.selection))for(n=0;n<l.selection.length;n++)i=i.concat(this.pages[l.selection[n]-1])}else i=i.concat(this.pages[l.selection-1]);else i=i.concat(this.activeRows);if(i.length){if("txt"===l.type||"csv"===l.type){for(h="",n=0;n<i.length;n++){for(r=0;r<i[n].cells.length;r++)if(!l.skipColumn.includes(s[r].originalCellIndex)&&this.columns(s[r].originalCellIndex).visible()){let t=i[n].cells[r].textContent;t=t.trim(),t=t.replace(/\s{2,}/g," "),t=t.replace(/\n/g,"  "),t=t.replace(/"/g,'""'),t=t.replace(/#/g,"%23"),t.includes(",")&&(t=`"${t}"`),h+=t+l.columnDelimiter}h=h.trim().substring(0,h.length-1),h+=l.lineDelimiter}h=h.trim().substring(0,h.length-1),l.download&&(h=`data:text/csv;charset=utf-8,${h}`)}else if("sql"===l.type){for(h=`INSERT INTO \`${l.tableName}\` (`,n=0;n<s.length;n++)!l.skipColumn.includes(s[n].originalCellIndex)&&this.columns(s[n].originalCellIndex).visible()&&(h+=`\`${s[n].textContent}\`,`);for(h=h.trim().substring(0,h.length-1),h+=") VALUES ",n=0;n<i.length;n++){for(h+="(",r=0;r<i[n].cells.length;r++)!l.skipColumn.includes(s[r].originalCellIndex)&&this.columns(s[r].originalCellIndex).visible()&&(h+=`"${i[n].cells[r].textContent}",`);h=h.trim().substring(0,h.length-1),h+="),"}h=h.trim().substring(0,h.length-1),h+=";",l.download&&(h=`data:application/sql;charset=utf-8,${h}`)}else if("json"===l.type){for(r=0;r<i.length;r++)for(a[r]=a[r]||{},n=0;n<s.length;n++)!l.skipColumn.includes(s[n].originalCellIndex)&&this.columns(s[n].originalCellIndex).visible()&&(a[r][s[n].textContent]=i[r].cells[n].textContent);h=JSON.stringify(a,l.replacer,l.space),l.download&&(h=`data:application/json;charset=utf-8,${h}`)}return l.download&&(l.filename=l.filename||"datatable_export",l.filename+=`.${l.type}`,h=encodeURI(h),o=document.createElement("a"),o.href=h,o.download=l.filename,document.body.appendChild(o),o.click(),document.body.removeChild(o)),h}}return!1}import(e){let s=!1;if(!t(e))return!1;const i={lineDelimiter:"\n",columnDelimiter:",",...e};if(i.data.length||t(i.data)){if("csv"===i.type){s={data:[]};const t=i.data.split(i.lineDelimiter);t.length&&(i.headings&&(s.headings=t[0].split(i.columnDelimiter),t.shift()),t.forEach(((t,e)=>{s.data[e]=[];const a=t.split(i.columnDelimiter);a.length&&a.forEach((t=>{s.data[e].push(t)}))})))}else if("json"===i.type){const e=(e=>{let s=!1;try{s=JSON.parse(e)}catch(t){return!1}return!(null===s||!Array.isArray(s)&&!t(s))&&s})(i.data);e&&(s={headings:[],data:[]},e.forEach(((t,e)=>{s.data[e]=[],Object.entries(t).forEach((([t,i])=>{s.headings.includes(t)||s.headings.push(t),s.data[e].push(i)}))})))}t(i.data)&&(s=i.data),s&&this.insert(s)}return!1}print(){const t=this.activeHeadings,s=this.activeRows,i=e("table"),a=e("thead"),n=e("tbody"),r=e("tr");t.forEach((t=>{r.appendChild(e("th",{html:t.textContent}))})),a.appendChild(r),s.forEach((t=>{const s=e("tr");Array.from(t.cells).forEach((t=>{s.appendChild(e("td",{html:t.textContent}))})),n.appendChild(s)})),i.appendChild(a),i.appendChild(n);const h=window.open();h.document.body.appendChild(i),h.print()}setMessage(t){let s=1;this.hasRows?s=this.data[0].cells.length:this.activeHeadings.length&&(s=this.activeHeadings.length),this.wrapper.classList.add("dataTable-empty"),this.label&&(this.label.innerHTML=""),this.totalPages=0,this.render("pager"),this.clear(e("tr",{html:`<td class="dataTables-empty" colspan="${s}">${t}</td>`}))}columns(t){return new r(this,t)}rows(t){return new n(this,t)}on(t,e){this.events=this.events||{},this.events[t]=this.events[t]||[],this.events[t].push(e)}off(t,e){this.events=this.events||{},t in this.events!=!1&&this.events[t].splice(this.events[t].indexOf(e),1)}emit(t){if(this.events=this.events||{},t in this.events!=!1)for(let e=0;e<this.events[t].length;e++)this.events[t][e].apply(this,Array.prototype.slice.call(arguments,1))}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function d(t,e){return t(e={exports:{}},e.exports),e.exports}var c=d((function(t,e){t.exports=function(){var t=1e3,e=6e4,s=36e5,i="millisecond",a="second",n="minute",r="hour",h="day",o="week",l="month",d="quarter",c="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},b=function(t,e,s){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(s)+t},v={s:b,z:function(t){var e=-t.utcOffset(),s=Math.abs(e),i=Math.floor(s/60),a=s%60;return(e<=0?"+":"-")+b(i,2,"0")+":"+b(a,2,"0")},m:function t(e,s){if(e.date()<s.date())return-t(s,e);var i=12*(s.year()-e.year())+(s.month()-e.month()),a=e.clone().add(i,l),n=s-a<0,r=e.clone().add(i+(n?-1:1),l);return+(-(i+(s-a)/(n?a-r:r-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:h,D:u,h:r,m:n,s:a,ms:i,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",w={};w[y]=m;var C=function(t){return t instanceof T},M=function(t,e,s){var i;if(!t)return y;if("string"==typeof t)w[t]&&(i=t),e&&(w[t]=e,i=t);else{var a=t.name;w[a]=t,i=a}return!s&&i&&(y=i),i||!s&&y},x=function(t,e){if(C(t))return t.clone();var s="object"==typeof e?e:{};return s.date=t,s.args=arguments,new T(s)},$=v;$.l=M,$.i=C,$.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var T=function(){function m(t){this.$L=M(t.locale,null,!0),this.parse(t)}var b=m.prototype;return b.parse=function(t){this.$d=function(t){var e=t.date,s=t.utc;if(null===e)return new Date(NaN);if($.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var a=i[2]-1||0,n=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)):new Date(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},b.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},b.$utils=function(){return $},b.isValid=function(){return!(this.$d.toString()===p)},b.isSame=function(t,e){var s=x(t);return this.startOf(e)<=s&&s<=this.endOf(e)},b.isAfter=function(t,e){return x(t)<this.startOf(e)},b.isBefore=function(t,e){return this.endOf(e)<x(t)},b.$g=function(t,e,s){return $.u(t)?this[e]:this.set(s,t)},b.unix=function(){return Math.floor(this.valueOf()/1e3)},b.valueOf=function(){return this.$d.getTime()},b.startOf=function(t,e){var s=this,i=!!$.u(e)||e,d=$.p(t),p=function(t,e){var a=$.w(s.$u?Date.UTC(s.$y,e,t):new Date(s.$y,e,t),s);return i?a:a.endOf(h)},f=function(t,e){return $.w(s.toDate()[t].apply(s.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(e)),s)},g=this.$W,m=this.$M,b=this.$D,v="set"+(this.$u?"UTC":"");switch(d){case c:return i?p(1,0):p(31,11);case l:return i?p(1,m):p(0,m+1);case o:var y=this.$locale().weekStart||0,w=(g<y?g+7:g)-y;return p(i?b-w:b+(6-w),m);case h:case u:return f(v+"Hours",0);case r:return f(v+"Minutes",1);case n:return f(v+"Seconds",2);case a:return f(v+"Milliseconds",3);default:return this.clone()}},b.endOf=function(t){return this.startOf(t,!1)},b.$set=function(t,e){var s,o=$.p(t),d="set"+(this.$u?"UTC":""),p=(s={},s[h]=d+"Date",s[u]=d+"Date",s[l]=d+"Month",s[c]=d+"FullYear",s[r]=d+"Hours",s[n]=d+"Minutes",s[a]=d+"Seconds",s[i]=d+"Milliseconds",s)[o],f=o===h?this.$D+(e-this.$W):e;if(o===l||o===c){var g=this.clone().set(u,1);g.$d[p](f),g.init(),this.$d=g.set(u,Math.min(this.$D,g.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},b.set=function(t,e){return this.clone().$set(t,e)},b.get=function(t){return this[$.p(t)]()},b.add=function(i,d){var u,p=this;i=Number(i);var f=$.p(d),g=function(t){var e=x(p);return $.w(e.date(e.date()+Math.round(t*i)),p)};if(f===l)return this.set(l,this.$M+i);if(f===c)return this.set(c,this.$y+i);if(f===h)return g(1);if(f===o)return g(7);var m=(u={},u[n]=e,u[r]=s,u[a]=t,u)[f]||1,b=this.$d.getTime()+i*m;return $.w(b,this)},b.subtract=function(t,e){return this.add(-1*t,e)},b.format=function(t){var e=this,s=this.$locale();if(!this.isValid())return s.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=$.z(this),n=this.$H,r=this.$m,h=this.$M,o=s.weekdays,l=s.months,d=function(t,s,a,n){return t&&(t[s]||t(e,i))||a[s].substr(0,n)},c=function(t){return $.s(n%12||12,t,"0")},u=s.meridiem||function(t,e,s){var i=t<12?"AM":"PM";return s?i.toLowerCase():i},f={YY:String(this.$y).slice(-2),YYYY:this.$y,M:h+1,MM:$.s(h+1,2,"0"),MMM:d(s.monthsShort,h,l,3),MMMM:d(l,h),D:this.$D,DD:$.s(this.$D,2,"0"),d:String(this.$W),dd:d(s.weekdaysMin,this.$W,o,2),ddd:d(s.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(n),HH:$.s(n,2,"0"),h:c(1),hh:c(2),a:u(n,r,!0),A:u(n,r,!1),m:String(r),mm:$.s(r,2,"0"),s:String(this.$s),ss:$.s(this.$s,2,"0"),SSS:$.s(this.$ms,3,"0"),Z:a};return i.replace(g,(function(t,e){return e||f[t]||a.replace(":","")}))},b.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},b.diff=function(i,u,p){var f,g=$.p(u),m=x(i),b=(m.utcOffset()-this.utcOffset())*e,v=this-m,y=$.m(this,m);return y=(f={},f[c]=y/12,f[l]=y,f[d]=y/3,f[o]=(v-b)/6048e5,f[h]=(v-b)/864e5,f[r]=v/s,f[n]=v/e,f[a]=v/t,f)[g]||v,p?y:$.a(y)},b.daysInMonth=function(){return this.endOf(l).$D},b.$locale=function(){return w[this.$L]},b.locale=function(t,e){if(!t)return this.$L;var s=this.clone(),i=M(t,e,!0);return i&&(s.$L=i),s},b.clone=function(){return $.w(this.$d,this)},b.toDate=function(){return new Date(this.valueOf())},b.toJSON=function(){return this.isValid()?this.toISOString():null},b.toISOString=function(){return this.$d.toISOString()},b.toString=function(){return this.$d.toUTCString()},m}(),D=T.prototype;return x.prototype=D,[["$ms",i],["$s",a],["$m",n],["$H",r],["$W",h],["$M",l],["$y",c],["$D",u]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,T,x),t.$i=!0),x},x.locale=M,x.isDayjs=C,x.unix=function(t){return x(1e3*t)},x.en=w[y],x.Ls=w,x.p={},x}()})),u=d((function(t,e){t.exports=function(){var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d\d/,i=/\d\d?/,a=/\d*[^\s\d-_:/()]+/,n={},r=function(t){return(t=+t)+(t>68?1900:2e3)},h=function(t){return function(e){this[t]=+e}},o=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),s=60*e[1]+(+e[2]||0);return 0===s?0:"+"===e[0]?-s:s}(t)}],l=function(t){var e=n[t];return e&&(e.indexOf?e:e.s.concat(e.f))},d=function(t,e){var s,i=n.meridiem;if(i){for(var a=1;a<=24;a+=1)if(t.indexOf(i(a,0,e))>-1){s=a>12;break}}else s=t===(e?"pm":"PM");return s},c={A:[a,function(t){this.afternoon=d(t,!1)}],a:[a,function(t){this.afternoon=d(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[s,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[i,h("seconds")],ss:[i,h("seconds")],m:[i,h("minutes")],mm:[i,h("minutes")],H:[i,h("hours")],h:[i,h("hours")],HH:[i,h("hours")],hh:[i,h("hours")],D:[i,h("day")],DD:[s,h("day")],Do:[a,function(t){var e=n.ordinal,s=t.match(/\d+/);if(this.day=s[0],e)for(var i=1;i<=31;i+=1)e(i).replace(/\[|\]/g,"")===t&&(this.day=i)}],M:[i,h("month")],MM:[s,h("month")],MMM:[a,function(t){var e=l("months"),s=(l("monthsShort")||e.map((function(t){return t.substr(0,3)}))).indexOf(t)+1;if(s<1)throw new Error;this.month=s%12||s}],MMMM:[a,function(t){var e=l("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,h("year")],YY:[s,function(t){this.year=r(t)}],YYYY:[/\d{4}/,h("year")],Z:o,ZZ:o};function u(s){var i,a;i=s,a=n&&n.formats;for(var r=(s=i.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,s,i){var n=i&&i.toUpperCase();return s||a[i]||t[i]||a[n].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,s){return e||s.slice(1)}))}))).match(e),h=r.length,o=0;o<h;o+=1){var l=r[o],d=c[l],u=d&&d[0],p=d&&d[1];r[o]=p?{regex:u,parser:p}:l.replace(/^\[|\]$/g,"")}return function(t){for(var e={},s=0,i=0;s<h;s+=1){var a=r[s];if("string"==typeof a)i+=a.length;else{var n=a.regex,o=a.parser,l=t.substr(i),d=n.exec(l)[0];o.call(e,d),t=t.replace(d,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var s=t.hours;e?s<12&&(t.hours+=12):12===s&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,s){s.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(r=t.parseTwoDigitYear);var i=e.prototype,a=i.parse;i.parse=function(t){var e=t.date,i=t.utc,r=t.args;this.$u=i;var h=r[1];if("string"==typeof h){var o=!0===r[2],l=!0===r[3],d=o||l,c=r[2];l&&(c=r[2]),n=this.$locale(),!o&&c&&(n=s.Ls[c]),this.$d=function(t,e,s){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var i=u(e)(t),a=i.year,n=i.month,r=i.day,h=i.hours,o=i.minutes,l=i.seconds,d=i.milliseconds,c=i.zone,p=new Date,f=r||(a||n?1:p.getDate()),g=a||p.getFullYear(),m=0;a&&!n||(m=n>0?n-1:p.getMonth());var b=h||0,v=o||0,y=l||0,w=d||0;return c?new Date(Date.UTC(g,m,f,b,v,y,w+60*c.offset*1e3)):s?new Date(Date.UTC(g,m,f,b,v,y,w)):new Date(g,m,f,b,v,y,w)}catch(t){return new Date("")}}(e,h,i),this.init(),c&&!0!==c&&(this.$L=this.locale(c).$L),d&&e!==this.format(h)&&(this.$d=new Date("")),n={}}else if(h instanceof Array)for(var p=h.length,f=1;f<=p;f+=1){r[1]=h[f-1];var g=s.apply(this,r);if(g.isValid()){this.$d=g.$d,this.$L=g.$L,this.init();break}f===p&&(this.$d=new Date(""))}else a.call(this,t)}}}()}));c.extend(u);var p=Object.freeze({__proto__:null,parseDate:(t,e)=>{let s=!1;if(e)switch(e){case"ISO_8601":s=t;break;case"RFC_2822":s=c(t,"ddd, MM MMM YYYY HH:mm:ss ZZ").format("YYYYMMDD");break;case"MYSQL":s=c(t,"YYYY-MM-DD hh:mm:ss").format("YYYYMMDD");break;case"UNIX":s=c(t).unix();break;default:s=c(t,e).format("YYYYMMDD")}return s}});export{l as DataTable};
