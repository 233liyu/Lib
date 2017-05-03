Page({
  data: {
    /*初始控制模块变量 */
    containerShow: true,
    searchPanelShow: false,
    Command:{},
 list: [
       {
        id: 'A',
        name: 'A 马克思主义、列宁主义、毛泽东思想、邓小平理论',
        open: false,
        pages: ['A1 马克思、恩格斯著作', 'A2 列宁著作', 'A3 斯大林著作','A4 毛泽东著作','A5 邓小平著作','A6 马克思、恩格斯、列宁、斯大林、毛泽东、邓小平著作汇编','A7 马克思、恩格斯、列宁、斯大林、毛泽东、邓小平生平和传记','A8 马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究']
     }, {
        id: 'B',
        name: 'B 哲学、宗教',
        open: false,
        pages: ['B0哲学理论', 'B1世界哲学', 'B2中国哲学','B3亚洲哲学','B4非洲哲学','B5欧洲哲学','B6大洋州哲学','B7美洲哲学','B80思维科学','B81逻辑学（论理学）','B82伦理学（道德哲学）','B83美学','B84心理学','B9宗教']
      }, {
        id: 'C',
        name: 'C 社会科学总论',
        open: false,
        pages: ['C0社会科学理论与方法论', 'C1社会科学概况、现状、进展', 'C2社会科学机构、团体、会议', 'C3社会科学研究方法', 'C4社会科学教育与普及', 'C5社会科学丛书、文集、连续性出版物', 'C6社会科学参考工具书', 'C7社会科学文献检索工具书', 'C79非书资料、视听资料','C8统计学','C91社会学','C92人口学','C93管理学','C94系统科学','C95民族学、文化人类学','C96人才学','C97劳动科学']
      }, {
        id: 'D',
        name: 'D 政治、法律',
        open: false,
        pages: ['D0政治学、政治理论','D1国际共产主义运动','D2中国共产党','D33/37各国共产党','D4工人、农民、青年、妇女运动与组织','D5世界政治','D6中国政治','D73/77各国政治','D8外交、国际关系','D9法律']
      }, {
        id: 'E',
        name: 'E 军事',
        open: false,
        pages: ['E0军事理论','E1世界军事','E2中国军事','E3/7各国军事','E8战略学、战役学、战术学','E9军事技术','E99军事地形学、军事地理学']
      }, {
        id: 'F',
        name: 'F 经济',
        pages: ['F0经济学','F1世界各国经济概况、经济史、经济地理','F2经济管理','F3农业经济','F4工业经济','F49信息产业经济','F5交通运输经济','F59旅游经济','F6邮电通信经济','F7贸易经济','F8财政、金融']
      }, {
        id: 'G',
        name: 'G 文化、科学、教育、体育',
        pages: ['G0文化理论','G1世界各国文化与文化事业','G2信息与知识传播','G3科学、科学研究','G4教育','G8体育']
      },
      {
        id: 'H',
        name: 'H 语言、文字',
        pages: ['H0语言学','H1汉语','H2中国少数民族语言','H3常用外国语','H4汉藏语系','H5阿尔泰语系(突厥-蒙古-通古斯语系）','H61南亚语系（澳斯特罗-亚细亚语系）','H62南印语系（达罗毗荼语系、德拉维达语系）','H63南岛语系（马来亚-玻里尼西亚语系）','H64东北亚诸语言','H65高加索语系（伊比利亚-高加索语系）','H66乌拉尔语系（芬兰-乌戈尔语系)','H67闪-含语系（阿非罗-亚细亚语系）','H7印欧语系','H81非洲诸语言','H83美洲诸语言','H84大洋州诸语言','H9国际辅助语']
      },
      {
         id: 'I',
         name:'I 文学',
         pages: ['I0文学理论','I1世界文学','I2中国文学','I3/7各国文学']
      },
       {
         id: 'J',
         name:'J 艺术',
         pages: ['J0艺术理论','J1世界各国艺术概况','J19专题艺术与现代边缘艺术','J2绘画','J29书法、篆刻','J3雕塑','J4摄影艺术','J5工艺美术','J59建筑艺术','J6音乐','J7舞蹈','J8戏剧、曲艺、杂技艺术','J9电影、电视艺术']
      },
       {
         id: 'K',
         name:'K 历史、地理',
         pages: ['K0史学理论','K1世界史','K2中国史','K3亚洲史','K4非洲史','K5欧洲史','K6大洋州史','K7美洲史','K81传记','K85文物考古','K89风俗习惯']
      },
       {
         id: 'N',
         name:'N 自然学科总论',
         pages: ['N0自然科学理论与方法论','N1自然科学概况、现状、进展','N1自然科学概况、现状、进展','N3自然科学研究方法','N4自然科学教育与普及','N5自然科学丛书、文集、连续性出版物','N6自然科学参考工具书','[N7]自然科学文献检索工具','N79非书资料、视听资料','N8自然科学调查、考察','N91自然研究、自然历史','N93非线性科学','N94系统科学','[N99]情报学、情报工作']
      },
       {
         id: 'O',
         name:'O 数理科学和化学',
         pages: ['O1数学','O3力学','O4物理学','O6化学','O7晶体学']
      },
       {
         id: 'P',
         name:'P 天文学、地球科学',
         pages: ['P1天文学','P2测绘学','P3地球物理学','P4大气科学（气象学）','P5地质学','P7海洋学','P9自然地理学']
      },
       {
         id: 'Q',
         name:'Q 生物科学',
         pages: ['Q1普通生物学','Q2细胞生物学','Q3遗传学','Q4生理学','Q5生物化学','Q6生物物理学','Q7分子生物学','Q81生物工程学（生物技术）','Q89环境生物学','Q91古生物学','Q93微生物学','Q94植物学','Q95动物学','Q96昆虫学','Q98人类学']
      },
       {
         id: 'R',
         name:'R 医药、卫生',
         pages: ['R1预防医学、卫生学','R2中国医学','R3基础医学','R4临床医学','R5内科学','R6外科学','R71妇产科学','R72儿科学','R73肿瘤学','R74神经病学与精神病学','R75皮肤病学与性病学','R76耳鼻咽喉科学','R77眼科学','R78口腔科学','R79外国民族医学','R8特种医学','R9药学']
      },
       {
         id: 'S',
         name:'S 农业科学',
         pages: ['S1农业基础科学','S2农业工程','S3农学（农艺学）','S4植物保护','S5农作物','S6园艺','S7林业','S8畜牧、 动物医学、狩猎、蚕、蜂','S9水产、渔业']
      },
       {
         id: 'T',
         name:'T 工业技术',
         pages: ['TB一般工业技术','TD矿业工程','TE石油、天然气工业','TF冶金工业','TG金属学与金属工艺','TH机械、仪表工业','TJ武器工业','TK能源与动力工程','TL原子能技术','TM电工技术','TN电子技术、通信技术','TP自动化技术、计算机技术','TQ化学工业','TS轻工业、手工业、生活服务业','TU建筑科学','TV水利工程']
      },
       {
         id: 'U',
         name:'U 交通运输',
         pages: ['U1综合运输','U2铁路运输','U4公路运输','U6水路运输','[U8]航空运输']
      },
       {
         id: 'V',
         name:'V 航空、航天',
         pages: ['V1航空、航天技术的研究与探索','V2航空','V4航天（宇宙航行）','[V7]航空、航天医学']
      },
       {
         id: 'X',
         name:'X 环境科学、安全科学',
         pages: ['X1环境科学基础理论','X2社会与环境','X3环境保护管理','X4灾害及其防治','X5环境污染及其防治','X7行业污染、废物处理与综合利用','X8环境质量评价与环境监测','X9安全科学']
      },
       {
         id: 'Z',
         name:'Z 综合性图书',
         pages: ['Z1丛书','Z2百科全书、类书','Z3辞典','Z4论文集、全集、选集、杂著','Z5年鉴、年刊','Z6期刊、连续性出版物','Z8图书报刊目录、文摘、索引']
      },
     
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

//推荐信息链接
onLoad: function(event)
{
  var CommandUrl = 'https://www.biulibiuli.cn/osc/';
  this.getCommBooklist(CommandUrl,"Command");
  },
/*-- 控制搜素面板 */
   
   onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onCancelImgTap : function(event){
    this.setData({
     containerShow: true,
    searchPanelShow: false
    })
  },
  onBookTap : function(event)
  {
      var bookId = event.currentTarget.dataset.bookid;
      console.log(bookId);
      wx.navigateTo({
      url: "../bookDetail/bookDetail?id="+bookId
      })
  },
getCommBooklist : function(CommandUrl,settedKey){
  wx.showNavigationBarLoading()
  var that = this;
  wx.request({
    url: CommandUrl,
    data: {
      
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {
        "Content-Type": "json"
      },
    success: function(res){
      // success
      that.processCommandData(res.data,settedKey);
    },
    fail: function(error) {
      // fail
      console.log(error)
    },
    complete: function(res) {
      // complete
    }
  })
},

processCommandData:function (BookInfo,settedKey)
{
  console.log(BookInfo);
  var books = [];
  var readyData = {};
    readyData[settedKey] = {
      books: BookInfo.message
    }
    this.setData(readyData);
    console.log(readyData)
    wx.hideNavigationBarLoading();
}
  
})
