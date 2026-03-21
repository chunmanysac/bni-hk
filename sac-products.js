/* SAC Global Products - Injected into DB.offers
 * Disney Britto & PlayShifu: 7折 (30% off)
 * All other brands: 8折 (20% off)
 */
(function injectSAC(){
  if(typeof DB==='undefined'||!DB.offers){return setTimeout(injectSAC,500);}
  var sacSeller={id:'sac001',company:'SAC Global Ltd',contact:'Simon Yeung',email:'info@sacgloballtd.com',phone:'+852 2127 0730',chapter:'BNI Achievers',bniId:'BNI-HK-SAC',payme:'+852 9761 2596',fps:'info@sacgloballtd.com',regFee:'paid',monthFee:'paid',postCount:0,status:'active',joinDate:'2024-01-01'};
  if(!DB.sellers.find(function(s){return s.id==='sac001';})){DB.sellers.push(sacSeller);}
  else{sacSeller=DB.sellers.find(function(s){return s.id==='sac001';});}
  var items=[
    // PAGE 1: Disney Britto + Robosen
    ['DSBRT Minnie Mouse 3.25 Mini',229,'Disney Britto'],
    ['Disney Britto Cheshire Cat Mini Figurine',229,'Disney Britto'],
    ['Disney Britto Midas Mickey Mouse Figurine',779,'Disney Britto'],
    ['Disney Britto Eeyore Mini Figurine',229,'Disney Britto'],
    ['Disney Britto Mickey & Minnie Love Figurine',779,'Disney Britto'],
    ['Robosen Flagship Soundwave G1 Robot (EN)',7599,'Robosen'],
    ['Disney Britto Simba & Nala Figurine',1053,'Disney Britto'],
    ['DSBRT Mickey & Minnie Wedding',1169,'Disney Britto'],
    ['Disney Britto Jasmine Figurine',779,'Disney Britto'],
    ['Disney Britto Bambi & Mother Figurine',779,'Disney Britto'],
    ['Disney Britto Tigger Figurine',779,'Disney Britto'],
    ['Disney Britto Tinker Bell Figurine',779,'Disney Britto'],
    ['Disney Britto Sorcerer Mickey Fantasia Figurine',1053,'Disney Britto'],
    ['Stitch Nurses Costume',249,'Disney Britto'],
    ['Robosen 旗艦級聲波 G1 機械人',9093,'Robosen'],
    ['Robosen 旗艦級聲波 G1 機械人 (日文版)',9399,'Robosen'],
    ['Disney Britto 翠絲迷你模型',229,'Disney Britto'],
    ['Disney Britto Donald Duck 90th',779,'Disney Britto'],
    ['Disney Britto 8" Steamboat Willie',779,'Disney Britto'],
    ['Disney Britto Stitch Big Fig',1799,'Disney Britto'],
    ['Robosen 自動變形機械人 旗艦級擎天柱',10940,'Robosen'],
    ['Robosen 語音控制機械人 Buzz Lightyear',5699,'Robosen'],
    ['大力士自動變型及可編程機械人',4399,'Robosen'],
    ['大力士自動變型及可編程機械人 (日文版)',4799,'Robosen'],
    // PAGE 2: Disney Britto + Robosen + Mideer
    ['Disney Britto Lilo and Stitch',779,'Disney Britto'],
    ['Disney Britto Sorcerer Mickey Mini',229,'Disney Britto'],
    ['Disney Britto Stitch Mini',229,'Disney Britto'],
    ['Disney Britto Dumbo Mini',229,'Disney Britto'],
    ['Disney Britto Mickey Mouse Mini',229,'Disney Britto'],
    ['Disney Britto Donald Duck Mini',229,'Disney Britto'],
    ['Disney Britto Winnie The Pooh Mini',229,'Disney Britto'],
    ['Disney Britto Bambi Mini',229,'Disney Britto'],
    ['Disney Britto Thumper Mini',229,'Disney Britto'],
    ['Disney Britto Marie Mini',229,'Disney Britto'],
    ['Disney Britto Cinderella Mini',229,'Disney Britto'],
    ['Disney Britto Snow White Mini',229,'Disney Britto'],
    ['Disney Britto Ariel Mini',229,'Disney Britto'],
    ['Disney Britto Rapunzel Mini',229,'Disney Britto'],
    ['Disney Britto Belle Mini',229,'Disney Britto'],
    ['Disney Britto Aurora Mini',229,'Disney Britto'],
    ['Robosen Elite Optimus Prime',5999,'Robosen'],
    ['Robosen Grimlock Flagship Robot',9999,'Robosen'],
    ['Mideer Level Up Puzzles Level 1',89,'Mideer'],
    ['Mideer Level Up Puzzles Level 2',99,'Mideer'],
    // PAGE 3: Mideer + Robosen + PlayShifu
    ['Mideer 水彩畫 - 奇妙森林',129,'Mideer'],
    ['Mideer 水彩畫 - 美麗花園',129,'Mideer'],
    ['Mideer 刮畫 - 夢幻世界',99,'Mideer'],
    ['Mideer 刮畫 - 海底世界',99,'Mideer'],
    ['Mideer 手指畫套裝',149,'Mideer'],
    ['Mideer 數字油畫 - 動物世界',139,'Mideer'],
    ['Mideer 數字油畫 - 花卉世界',139,'Mideer'],
    ['Mideer Level Up Puzzles Level 3',109,'Mideer'],
    ['Mideer Level Up Puzzles Level 4',119,'Mideer'],
    ['Mideer Level Up Puzzles Level 5',129,'Mideer'],
    ['Mideer Level Up Puzzles Level 6',139,'Mideer'],
    ['Mideer Level Up Puzzles Level 7',149,'Mideer'],
    ['Robosen Buzz Lightyear Robot',5699,'Robosen'],
    ['Robosen K1 Pro Inter-stellar Scout',3999,'Robosen'],
    ['Playshifu Plugo Tunes',499,'PlayShifu'],
    ['Playshifu Plugo Letters',499,'PlayShifu'],
    ['Playshifu Plugo Count',499,'PlayShifu'],
    ['Playshifu Plugo Link',499,'PlayShifu'],
    ['Playshifu Tacto Chess',499,'PlayShifu'],
    ['Playshifu Tacto Laser',499,'PlayShifu'],
    ['Playshifu Tacto Classics',399,'PlayShifu'],
    ['Playshifu Tacto Doctor',499,'PlayShifu'],
    // PAGE 4: PlayShifu + Wonder Workshop + Rotrics
    ['Playshifu Orboot Earth',699,'PlayShifu'],
    ['Playshifu Orboot Mars',699,'PlayShifu'],
    ['Playshifu Orboot Dinos',699,'PlayShifu'],
    ['Playshifu Plugo Slingshot',499,'PlayShifu'],
    ['Playshifu Plugo Farm',499,'PlayShifu'],
    ['Playshifu Tacto Coding',499,'PlayShifu'],
    ['Wonder Workshop Cue Robot',1299,'Wonder Workshop'],
    ['Wonder Workshop Dash Robot',1199,'Wonder Workshop'],
    ['Wonder Workshop Dot Creativity Kit',599,'Wonder Workshop'],
    ['Rotrics DexArm Luxury Kit',5999,'Rotrics'],
    ['Rotrics DexArm Standard Kit',4599,'Rotrics'],
    ['Rotrics DexArm Maker Kit',3999,'Rotrics']
  ];
  var discountBrands=['Disney Britto','PlayShifu'];
  for(var i=0;i<items.length;i++){
    var name=items[i][0],origPrice=items[i][1],brand=items[i][2];
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
      image:'https://picsum.photos/seed/sac'+i+'/600/450',
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
