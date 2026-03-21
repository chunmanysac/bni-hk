/* SAC Global Products - Injected into DB.offers
 * Disney Britto & PlayShifu: 7折 (30% off)
 * All other brands: 8折 (20% off)
 * Updated: All SAC Shopline Disney Britto products with real Enesco images
 */
(function injectSAC(){
 if(typeof DB==='undefined'||!DB.offers){return setTimeout(injectSAC,500);}
 var sacSeller={id:'sac001',company:'SAC Global Ltd',contact:'Simon Yeung',email:'info@sacgloballtd.com',phone:'+852 2127 0730',chapter:'BNI Achievers',bniId:'BNI-HK-SAC',payme:'+852 9761 2596',fps:'info@sacgloballtd.com',regFee:'paid',monthFee:'paid',postCount:0,status:'active',joinDate:'2024-01-01'};
 if(!DB.sellers.find(function(s){return s.id==='sac001';})){DB.sellers.push(sacSeller);}
 else{sacSeller=DB.sellers.find(function(s){return s.id==='sac001';});}
 var items=[
 // === SAC Shopline Disney Britto Page 1 (24 products) ===
 ['DSBRT Minnie Mouse 3.25 Mini',229,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017590.jpg'],
 ['Disney Britto Cheshire Cat Mini Figurine',229,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010297.jpg'],
 ['Disney Britto Midas Mickey Mouse Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/4055228.jpg'],
 ['Disney Britto Eeyore Mini Figurine',229,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010087.jpg'],
 ['Disney Britto Mickey & Minnie Love Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010105.jpg'],
 ['Disney Britto Simba & Nala Figurine',1053,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017587.jpg'],
 ['Disney Britto Jasmine Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010316.jpg'],
 ['Disney Britto Bambi & Mother Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010318.jpg'],
 ['Disney Britto Tigger Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010969.jpg'],
 ['Disney Britto Tinker Bell Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017588.jpg'],
 ['Disney Britto Sorcerer Mickey Fantasia Figurine',1053,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017586.jpg'],
 ['Disney Britto Mini Stitch Figurine',229,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6006125.jpg'],
 ['Disney Britto Donald Duck 90th',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6013459.jpg'],
 ['Disney Britto 8" Steamboat Willie',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015551.jpg'],
 ['Disney Britto Stitch Big Fig',1799,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010568.jpg'],
 ['Disney Britto 8" Stitch & Scrump',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015553.jpg'],
 ['Disney Britto 8" Minnie Mouse',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015550.jpg'],
 ['Disney Britto 8" Band Leader Mickey',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015549.jpg'],
 ['Disney Britto Mickey Love NLE 5000',979,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015554.jpg'],
 ['Disney Britto Belle',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010315.jpg'],
 ['Disney Britto Beast',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010730.jpg'],
 ['Disney Britto Midas Sorcerer Mickey',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6013807.jpg'],
 ['Disney Britto Ariel on Rock',629,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6009052.jpg'],
 ['Disney Britto Donald Duck',669,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6008527.jpg'],
 // === SAC Shopline Disney Britto Page 2 (9 products) ===
 ['Disney Britto Goofy Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010301.jpg'],
 ['Disney Britto Queen of Hearts',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6008525.jpg'],
 ['Disney Britto Alice in Wonderland',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6008524.jpg'],
 ['Disney Britto Oswald',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015555.jpg'],
 ['Disney Britto Angel Figurine',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017591.jpg'],
 ['Disney Britto Mickey & Pluto',1059,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6004977.jpg'],
 ['Disney Britto Mini Mickey',229,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6017589.jpg'],
 ['Disney Britto Minnie Bling',859,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6015556.jpg'],
 ['Enesco Disney Britto Eeyore Fig',779,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6010094.jpg'],
 // === Other SAC products ===
 ['DSBRT Mickey & Minnie Wedding',1169,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6013831.jpg'],
 ['Stitch Nurses Costume',249,'Disney Britto','https://cdn.shopify.com/s/files/1/1525/5488/files/6016319.jpg'],
 ['Robosen Flagship Soundwave G1 Robot (EN)',7599,'Robosen',''],
 ['Robosen 旗艦級聲波 G1 機械人',9093,'Robosen',''],
 ['Robosen 旗艦級聲波 G1 機械人 (日文版)',9399,'Robosen',''],
 ['Robosen 自動變形機械人 旗艦級擎天柱',10940,'Robosen',''],
 ['Robosen 語音控制機械人 Buzz Lightyear',5699,'Robosen',''],
 ['大力士自動變型及可編程機械人',4399,'Robosen',''],
 ['大力士自動變型及可編程機械人 (日文版)',4799,'Robosen',''],
 ['Robosen Elite Optimus Prime',5999,'Robosen',''],
 ['Robosen Grimlock Flagship Robot',9999,'Robosen',''],
 ['Playshifu Plugo Tunes',499,'PlayShifu',''],
 ['Playshifu Plugo Letters',499,'PlayShifu',''],
 ['Playshifu Plugo Count',499,'PlayShifu',''],
 ['Playshifu Plugo Link',499,'PlayShifu',''],
 ['Playshifu Tacto Chess',499,'PlayShifu',''],
 ['Playshifu Tacto Laser',499,'PlayShifu',''],
 ['Playshifu Tacto Classics',399,'PlayShifu',''],
 ['Playshifu Tacto Doctor',499,'PlayShifu',''],
 ['Playshifu Orboot Earth',699,'PlayShifu',''],
 ['Playshifu Orboot Mars',699,'PlayShifu',''],
 ['Playshifu Orboot Dinos',699,'PlayShifu',''],
 ['Playshifu Plugo Slingshot',499,'PlayShifu',''],
 ['Playshifu Plugo Farm',499,'PlayShifu',''],
 ['Playshifu Tacto Coding',499,'PlayShifu','']
 ];
 var discountBrands=['Disney Britto','PlayShifu'];
 for(var i=0;i<items.length;i++){
 var name=items[i][0],origPrice=items[i][1],brand=items[i][2],img=items[i][3];
 var isSpecial=discountBrands.indexOf(brand)>=0;
 var rate=isSpecial?0.7:0.8;
 var discPrice=Math.round(origPrice*rate);
 var discType=isSpecial?'70':'80';
 var pctOff=isSpecial?30:20;
 DB.offers.push({
 id:'sac'+String(i+1).padStart(3,'0'),
 sellerId:'sac001',
 title:name,
 desc:brand+' | 原價 HK$'+origPrice.toLocaleString()+' \u2192 '+pctOff+'% off | SAC Global Ltd 獨家優惠',
 image:img||'https://picsum.photos/seed/sac'+i+'/600/450',
 originalPrice:origPrice,
 discountedPrice:discPrice,
 discountType:discType,
 isCoupon:false,
 terms:'BNI 會員專屬價，WhatsApp 9761 2596 查詢。',
 expiry:'2026-12-31',
 status:'active',
 views:Math.floor(Math.random()*200),
 orders:Math.floor(Math.random()*20),
 createdAt:'2025-01-20'
 });
 }
 sacSeller.postCount=items.length;
 if(typeof renderOffers==='function') renderOffers();
 console.log('SAC Global: '+items.length+' products injected into DB.offers');
})();
