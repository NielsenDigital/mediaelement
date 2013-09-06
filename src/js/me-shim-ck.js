// Handles calls from Flash/Silverlight and reports them as native <video/audio> events and properties
function onYouTubePlayerAPIReady(){mejs.YouTubeApi.iFrameReady()}function onYouTubePlayerReady(e){mejs.YouTubeApi.flashReady(e)}mejs.MediaPluginBridge={pluginMediaElements:{},htmlMediaElements:{},registerPluginElement:function(e,t,n){this.pluginMediaElements[e]=t;this.htmlMediaElements[e]=n},unregisterPluginElement:function(e){delete this.pluginMediaElements[e];delete this.htmlMediaElements[e]},initPlugin:function(e){var t=this.pluginMediaElements[e],n=this.htmlMediaElements[e];if(t){switch(t.pluginType){case"flash":t.pluginElement=t.pluginApi=document.getElementById(e);break;case"silverlight":t.pluginElement=document.getElementById(t.id);t.pluginApi=t.pluginElement.Content.MediaElementJS}t.pluginApi!=null&&t.success&&t.success(t,n)}},fireEvent:function(e,t,n){var r,i,s,o=this.pluginMediaElements[e];if(!o)return;r={type:t,target:o};for(i in n){o[i]=n[i];r[i]=n[i]}s=n.bufferedTime||0;r.target.buffered=r.buffered={start:function(e){return 0},end:function(e){return s},length:1};o.dispatchEvent(r.type,r)}};mejs.MediaElementDefaults={mode:"auto",plugins:["flash","silverlight","youtube","vimeo"],enablePluginDebug:!1,httpsBasicAuthSite:!1,type:"",pluginPath:mejs.Utility.getScriptPath(["mediaelement.js","mediaelement.min.js","mediaelement-and-player.js","mediaelement-and-player.min.js"]),flashName:"flashmediaelement.swf",flashStreamer:"",enablePluginSmoothing:!1,enablePseudoStreaming:!1,pseudoStreamingStartQueryParam:"start",silverlightName:"silverlightmediaelement.xap",defaultVideoWidth:480,defaultVideoHeight:270,pluginWidth:-1,pluginHeight:-1,pluginVars:[],timerRate:250,startVolume:.8,success:function(){},error:function(){}};mejs.MediaElement=function(e,t){return mejs.HtmlMediaElementShim.create(e,t)};mejs.HtmlMediaElementShim={create:function(e,t){var n=mejs.MediaElementDefaults,r=typeof e=="string"?document.getElementById(e):e,i=r.tagName.toLowerCase(),s=i==="audio"||i==="video",o=s?r.getAttribute("src"):r.getAttribute("href"),u=r.getAttribute("poster"),a=r.getAttribute("autoplay"),f=r.getAttribute("preload"),l=r.getAttribute("controls"),c,h;for(h in t)n[h]=t[h];o=typeof o=="undefined"||o===null||o==""?null:o;u=typeof u=="undefined"||u===null?"":u;f=typeof f=="undefined"||f===null||f==="false"?"none":f;a=typeof a!="undefined"&&a!==null&&a!=="false";l=typeof l!="undefined"&&l!==null&&l!=="false";c=this.determinePlayback(r,n,mejs.MediaFeatures.supportsMediaTag,s,o);c.url=c.url!==null?mejs.Utility.absolutizeUrl(c.url):"";if(c.method=="native"){if(mejs.MediaFeatures.isBustedAndroid){r.src=c.url;r.addEventListener("click",function(){r.play()},!1)}return this.updateNative(c,n,a,f)}if(c.method!=="")return this.createPlugin(c,n,u,a,f,l);this.createErrorMessage(c,n,u);return this},determinePlayback:function(e,t,n,r,i){var s=[],o,u,a,f,l,c,h={method:"",url:"",htmlMediaElement:e,isVideo:e.tagName.toLowerCase()!="audio"},p,d,v,m,g;if(typeof t.type!="undefined"&&t.type!=="")if(typeof t.type=="string")s.push({type:t.type,url:i});else for(o=0;o<t.type.length;o++)s.push({type:t.type[o],url:i});else if(i!==null){c=this.formatType(i,e.getAttribute("type"));s.push({type:c,url:i})}else for(o=0;o<e.childNodes.length;o++){l=e.childNodes[o];if(l.nodeType==1&&l.tagName.toLowerCase()=="source"){i=l.getAttribute("src");c=this.formatType(i,l.getAttribute("type"));g=l.getAttribute("media");(!g||!window.matchMedia||window.matchMedia&&window.matchMedia(g).matches)&&s.push({type:c,url:i})}}!r&&s.length>0&&s[0].url!==null&&this.getTypeFromFile(s[0].url).indexOf("audio")>-1&&(h.isVideo=!1);mejs.MediaFeatures.isBustedAndroid&&(e.canPlayType=function(e){return e.match(/video\/(mp4|m4v)/gi)!==null?"maybe":""});if(n&&(t.mode==="auto"||t.mode==="auto_plugin"||t.mode==="native")&&(!mejs.MediaFeatures.isBustedNativeHTTPS||t.httpsBasicAuthSite!==!0)){if(!r){m=document.createElement(h.isVideo?"video":"audio");e.parentNode.insertBefore(m,e);e.style.display="none";h.htmlMediaElement=e=m}for(o=0;o<s.length;o++)if(e.canPlayType(s[o].type).replace(/no/,"")!==""||e.canPlayType(s[o].type.replace(/mp3/,"mpeg")).replace(/no/,"")!==""){h.method="native";h.url=s[o].url;break}if(h.method==="native"){h.url!==null&&(e.src=h.url);if(t.mode!=="auto_plugin")return h}}if(t.mode==="auto"||t.mode==="auto_plugin"||t.mode==="shim")for(o=0;o<s.length;o++){c=s[o].type;for(u=0;u<t.plugins.length;u++){p=t.plugins[u];d=mejs.plugins[p];for(a=0;a<d.length;a++){v=d[a];if(v.version==null||mejs.PluginDetector.hasPluginVersion(p,v.version))for(f=0;f<v.types.length;f++)if(c==v.types[f]){h.method=p;h.url=s[o].url;return h}}}}if(t.mode==="auto_plugin"&&h.method==="native")return h;h.method===""&&s.length>0&&(h.url=s[0].url);return h},formatType:function(e,t){var n;return e&&!t?this.getTypeFromFile(e):t&&~t.indexOf(";")?t.substr(0,t.indexOf(";")):t},getTypeFromFile:function(e){e=e.split("?")[0];var t=e.substring(e.lastIndexOf(".")+1).toLowerCase();return(/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t)?"video":"audio")+"/"+this.getTypeFromExtension(t)},getTypeFromExtension:function(e){switch(e){case"mp4":case"m4v":return"mp4";case"webm":case"webma":case"webmv":return"webm";case"ogg":case"oga":case"ogv":return"ogg";default:return e}},createErrorMessage:function(e,t,n){var r=e.htmlMediaElement,i=document.createElement("div");i.className="me-cannotplay";try{i.style.width=r.width+"px";i.style.height=r.height+"px"}catch(s){}t.customError?i.innerHTML=t.customError:i.innerHTML=n!==""?'<a href="'+e.url+'"><img src="'+n+'" width="100%" height="100%" /></a>':'<a href="'+e.url+'"><span>'+mejs.i18n.t("Download File")+"</span></a>";r.parentNode.insertBefore(i,r);r.style.display="none";t.error(r)},createPlugin:function(e,t,n,r,i,s){var o=e.htmlMediaElement,u=1,a=1,f="me_"+e.method+"_"+mejs.meIndex++,l=new mejs.PluginMediaElement(f,e.method,e.url),c=document.createElement("div"),h,p,d;l.tagName=o.tagName;for(var v=0;v<o.attributes.length;v++){var m=o.attributes[v];m.specified==1&&l.setAttribute(m.name,m.value)}p=o.parentNode;while(p!==null&&p.tagName.toLowerCase()!="body"){if(p.parentNode.tagName.toLowerCase()=="p"){p.parentNode.parentNode.insertBefore(p,p.parentNode);break}p=p.parentNode}if(e.isVideo){u=t.pluginWidth>0?t.pluginWidth:t.videoWidth>0?t.videoWidth:o.getAttribute("width")!==null?o.getAttribute("width"):t.defaultVideoWidth;a=t.pluginHeight>0?t.pluginHeight:t.videoHeight>0?t.videoHeight:o.getAttribute("height")!==null?o.getAttribute("height"):t.defaultVideoHeight;u=mejs.Utility.encodeUrl(u);a=mejs.Utility.encodeUrl(a)}else if(t.enablePluginDebug){u=320;a=240}l.success=t.success;mejs.MediaPluginBridge.registerPluginElement(f,l,o);c.className="me-plugin";c.id=f+"_container";e.isVideo?o.parentNode.insertBefore(c,o):document.body.insertBefore(c,document.body.childNodes[0]);d=["id="+f,"isvideo="+(e.isVideo?"true":"false"),"autoplay="+(r?"true":"false"),"preload="+i,"width="+u,"startvolume="+t.startVolume,"timerrate="+t.timerRate,"flashstreamer="+t.flashStreamer,"height="+a,"pseudostreamstart="+t.pseudoStreamingStartQueryParam];e.url!==null&&(e.method=="flash"?d.push("file="+mejs.Utility.encodeUrl(e.url)):d.push("file="+e.url));t.enablePluginDebug&&d.push("debug=true");t.enablePluginSmoothing&&d.push("smoothing=true");t.enablePseudoStreaming&&d.push("pseudostreaming=true");s&&d.push("controls=true");t.pluginVars&&(d=d.concat(t.pluginVars));switch(e.method){case"silverlight":c.innerHTML='<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="'+f+'" name="'+f+'" width="'+u+'" height="'+a+'" class="mejs-shim">'+'<param name="initParams" value="'+d.join(",")+'" />'+'<param name="windowless" value="true" />'+'<param name="background" value="black" />'+'<param name="minRuntimeVersion" value="3.0.0.0" />'+'<param name="autoUpgrade" value="true" />'+'<param name="source" value="'+t.pluginPath+t.silverlightName+'" />'+"</object>";break;case"flash":if(mejs.MediaFeatures.isIE){h=document.createElement("div");c.appendChild(h);h.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+f+'" width="'+u+'" height="'+a+'" class="mejs-shim">'+'<param name="movie" value="'+t.pluginPath+t.flashName+"?x="+new Date+'" />'+'<param name="flashvars" value="'+d.join("&amp;")+'" />'+'<param name="quality" value="high" />'+'<param name="bgcolor" value="#000000" />'+'<param name="wmode" value="transparent" />'+'<param name="allowScriptAccess" value="always" />'+'<param name="allowFullScreen" value="true" />'+"</object>"}else c.innerHTML='<embed id="'+f+'" name="'+f+'" '+'play="true" '+'loop="false" '+'quality="high" '+'bgcolor="#000000" '+'wmode="transparent" '+'allowScriptAccess="always" '+'allowFullScreen="true" '+'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" '+'src="'+t.pluginPath+t.flashName+'" '+'flashvars="'+d.join("&")+'" '+'width="'+u+'" '+'height="'+a+'" '+'class="mejs-shim"></embed>';break;case"youtube":var g=e.url.substr(e.url.lastIndexOf("=")+1);youtubeSettings={container:c,containerId:c.id,pluginMediaElement:l,pluginId:f,videoId:g,height:a,width:u};mejs.PluginDetector.hasPluginVersion("flash",[10,0,0])?mejs.YouTubeApi.createFlash(youtubeSettings):mejs.YouTubeApi.enqueueIframe(youtubeSettings);break;case"vimeo":l.vimeoid=e.url.substr(e.url.lastIndexOf("/")+1);c.innerHTML='<iframe src="http://player.vimeo.com/video/'+l.vimeoid+'?portrait=0&byline=0&title=0" width="'+u+'" height="'+a+'" frameborder="0" class="mejs-shim"></iframe>'}o.style.display="none";o.removeAttribute("autoplay");return l},updateNative:function(e,t,n,r){var i=e.htmlMediaElement,s;for(s in mejs.HtmlMediaElement)i[s]=mejs.HtmlMediaElement[s];t.success(i,i);return i}};mejs.YouTubeApi={isIframeStarted:!1,isIframeLoaded:!1,loadIframeApi:function(){if(!this.isIframeStarted){var e=document.createElement("script");e.src="//www.youtube.com/player_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);this.isIframeStarted=!0}},iframeQueue:[],enqueueIframe:function(e){if(this.isLoaded)this.createIframe(e);else{this.loadIframeApi();this.iframeQueue.push(e)}},createIframe:function(e){var t=e.pluginMediaElement,n=new YT.Player(e.containerId,{height:e.height,width:e.width,videoId:e.videoId,playerVars:{controls:0},events:{onReady:function(){e.pluginMediaElement.pluginApi=n;mejs.MediaPluginBridge.initPlugin(e.pluginId);setInterval(function(){mejs.YouTubeApi.createEvent(n,t,"timeupdate")},250)},onStateChange:function(e){mejs.YouTubeApi.handleStateChange(e.data,n,t)}}})},createEvent:function(e,t,n){var r={type:n,target:t};if(e&&e.getDuration){t.currentTime=r.currentTime=e.getCurrentTime();t.duration=r.duration=e.getDuration();r.paused=t.paused;r.ended=t.ended;r.muted=e.isMuted();r.volume=e.getVolume()/100;r.bytesTotal=e.getVideoBytesTotal();r.bufferedBytes=e.getVideoBytesLoaded();var i=r.bufferedBytes/r.bytesTotal*r.duration;r.target.buffered=r.buffered={start:function(e){return 0},end:function(e){return i},length:1}}t.dispatchEvent(r.type,r)},iFrameReady:function(){this.isLoaded=!0;this.isIframeLoaded=!0;while(this.iframeQueue.length>0){var e=this.iframeQueue.pop();this.createIframe(e)}},flashPlayers:{},createFlash:function(e){this.flashPlayers[e.pluginId]=e;var t,n="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid="+e.pluginId+"&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";if(mejs.MediaFeatures.isIE){t=document.createElement("div");e.container.appendChild(t);t.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+e.pluginId+'" width="'+e.width+'" height="'+e.height+'" class="mejs-shim">'+'<param name="movie" value="'+n+'" />'+'<param name="wmode" value="transparent" />'+'<param name="allowScriptAccess" value="always" />'+'<param name="allowFullScreen" value="true" />'+"</object>"}else e.container.innerHTML='<object type="application/x-shockwave-flash" id="'+e.pluginId+'" data="'+n+'" '+'width="'+e.width+'" height="'+e.height+'" style="visibility: visible; " class="mejs-shim">'+'<param name="allowScriptAccess" value="always">'+'<param name="wmode" value="transparent">'+"</object>"},flashReady:function(e){var t=this.flashPlayers[e],n=document.getElementById(e),r=t.pluginMediaElement;r.pluginApi=r.pluginElement=n;mejs.MediaPluginBridge.initPlugin(e);n.cueVideoById(t.videoId);var i=t.containerId+"_callback";window[i]=function(e){mejs.YouTubeApi.handleStateChange(e,n,r)};n.addEventListener("onStateChange",i);setInterval(function(){mejs.YouTubeApi.createEvent(n,r,"timeupdate")},250)},handleStateChange:function(e,t,n){switch(e){case-1:n.paused=!0;n.ended=!0;mejs.YouTubeApi.createEvent(t,n,"loadedmetadata");break;case 0:n.paused=!1;n.ended=!0;mejs.YouTubeApi.createEvent(t,n,"ended");break;case 1:n.paused=!1;n.ended=!1;mejs.YouTubeApi.createEvent(t,n,"play");mejs.YouTubeApi.createEvent(t,n,"playing");break;case 2:n.paused=!0;n.ended=!1;mejs.YouTubeApi.createEvent(t,n,"pause");break;case 3:mejs.YouTubeApi.createEvent(t,n,"progress");break;case 5:}}};window.mejs=mejs;window.MediaElement=mejs.MediaElement;