window.Modernizr=function(a,b,c){function g(a){n.cssText=a}function f(a,b){return g(prefixes.join(a+";")+(b||""))}function e(a,b){return typeof a===b}function d(a,b){return!!~(""+a).indexOf(b)}var h="2.0.6",i={},j=b.documentElement,k=b.head||b.getElementsByTagName("head")[0],l="modernizr",m=b.createElement(l),n=m.style,o,p=Object.prototype.toString,q={},r={},s={},t=[],u,v={}.hasOwnProperty,w;!e(v,c)&&!e(v.call,c)?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&e(a.constructor.prototype[b],c)};for(var x in q)w(q,x)&&(u=x.toLowerCase(),i[u]=q[x](),t.push((i[u]?"":"no-")+u));g(""),m=o=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function d(a){var b=-1;while(++b<h)a.createElement(g[b])}a.iepp=a.iepp||{};var e=a.iepp,f=e.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",g=f.split("|"),h=g.length,i=new RegExp("(^|\\s)("+f+")","gi"),j=new RegExp("<(/*)("+f+")","gi"),k=/^\s*[\{\}]\s*$/,l=new RegExp("(^|[^\\n]*?\\s)("+f+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),m=b.createDocumentFragment(),n=b.documentElement,o=n.firstChild,p=b.createElement("body"),q=b.createElement("style"),r=/print|all/,s;e.getCSS=function(a,b){if(a+""===c)return"";var d=-1,f=a.length,g,h=[];while(++d<f){g=a[d];if(g.disabled)continue;b=g.media||b,r.test(b)&&h.push(e.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},e.parseCSS=function(a){var b=[],c;while((c=l.exec(a))!=null)b.push(((k.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(i,"$1.iepp_$2")+c[4]);return b.join("\n")},e.writeHTML=function(){var a=-1;s=s||b.body;while(++a<h){var c=b.getElementsByTagName(g[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+g[a])}m.appendChild(s),n.appendChild(p),p.className=s.className,p.id=s.id,p.innerHTML=s.innerHTML.replace(j,"<$1font")},e._beforePrint=function(){q.styleSheet.cssText=e.parseCSS(e.getCSS(b.styleSheets,"all")),e.writeHTML()},e.restoreHTML=function(){p.innerHTML="",n.removeChild(p),n.appendChild(s)},e._afterPrint=function(){e.restoreHTML(),q.styleSheet.cssText=""},d(b),d(m),e.disablePP||(o.insertBefore(q,o.firstChild),q.media="print",q.className="iepp-printshim",a.attachEvent("onbeforeprint",e._beforePrint),a.attachEvent("onafterprint",e._afterPrint))}(a,b),i._version=h;return i}(this,this.document)