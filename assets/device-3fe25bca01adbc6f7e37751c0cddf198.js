window.__device=function(){function i(i){if(i)for(i=i.split(" "),t=0;t<i.length;t++)n[i[t]]=!0}function e(){var e,o=[];n.desktop||n.tablet||i("mobile");for(e in n)n.hasOwnProperty(e)&&o.push(e);n.desktop||n.tablet||(a.className+=(a.className?" ":"")+o.join(" "))}function o(i){return r.indexOf(i)>-1?s[i]:void 0}var t,n={},r=navigator.userAgent,a=document.documentElement,s={"WebKit/":"webkit","Trident/":"msie",Firefox:"firefox","(iPad":"ios ipad","(iPhone":"ios iphone","(iPod":"ios iphone","Chrome/":"chrome",CriOS:"chrome","Android ":"android","Windows Phone ":"winphone","Safari/":"safari","OS 6_":"ios6","OS 7_":"ios7","OS 8_":"ios8","OS 9_":"ios9",Silk:"silk",Nokia:"nokia"};for(var d in s)if(d){var l=o(d);n.ios&&(/(OS )[0-5]/g.test(r)&&i("ios<6"),/(ios)[6-9]/g.test(l)&&i(l)),l&&i(l)}n.ios||delete n.safari,n.msie&&(parseInt(r.substr(r.indexOf("MSIE ")+5,2),10)<9&&i("msielt9"),parseInt(r.substr(r.indexOf("MSIE ")+5,2),10)<10&&i("msielt10"));var g=/RIM/g.test(r)||/BB/g.test(r)||/RIM Tablet/g.test(r)||/BlackBerry/g.test(r);g&&i("bb");var c={eclair:/(Android).[2].[0-1]/g,froyo:/(Android).[2].[2]/g,gingerbread:/(Android).[2].[3]/g,honeycomb:/(Android).[3].[0-2]/g,icecream:/(Android).[4].[0]/g,jellybean:/(Android).[4].[1-3]/g,kitkat:/(Android).[4].[4]/g,lollipop:/(Android).[5]/g,marshmallow:/(Android).[6]/g};if(n.android){var m=/(Android).[0-9].[0-9]/g;if(/Mobile/.test(r)&&i("mobile"),m.test(r)){var b=r.match(m)[0];if(b){b=b.replace(/ /g,"_");for(var d in c)c[d].test(b)&&i(d)}}}navigator.msPointerEnabled&&navigator.msMaxTouchPoints>1&&i("touch"),navigator.standalone&&i("standalone"),navigator.devicePixelRatio&&navigator.devicePixelRatio>=2&&i("retina");var f=!(n.mobile||n.android||n.ios||n.silk||n.symbian||n.winphone||n.bb);f&&i("desktop");for(var h=[screen.width,window.innerWidth,window.outerWidth,document.documentElement.clientWidth],v=0,t=0;t<h.length;t++)v+=h[t];var u=(v/h.length,/Mobile/.test(r),!n.mobile&&(n.ios&&n.ipad||n.android||/(Nexus )[6-9]/.test(r)||/(SCH\-)[A-Z][0-9]/.test(r)||n.bb&&/PlayBook/.test(r)||n.silk&&/(KF)\w.../.test(r)));return u&&i("tablet"),e(),n}(),console.log(JSON.stringify(__device));