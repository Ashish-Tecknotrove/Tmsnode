window.globalProvideData('slide', '{"title":"Text Entry","trackViews":true,"showMenuResultIcon":false,"viewGroupId":"","historyGroupId":"","videoZoom":"","scrolling":false,"transition":"appear","transDuration":0,"transDir":1,"wipeTrans":false,"slideLock":false,"navIndex":-1,"globalAudioId":"","thumbnailid":"","slideNumberInScene":3,"includeInSlideCounts":true,"presenterRef":{"id":"none"},"showAnimationId":"","lmsId":"Slide3","width":720,"height":540,"resume":true,"background":{"type":"fill","fill":{"type":"linear","rotation":90,"colors":[{"kind":"color","rgb":"0xFFFFFF","alpha":100,"stop":0}]}},"id":"5aEMNj5mBGN","actionGroups":{"ActGrpOnSubmitButtonClick":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"noteq","valuea":"5yrIgFBBDTu.$Text","typea":"property","valueb":"","typeb":"string"}},"thenActions":[{"kind":"eval_interaction","id":"_this.6dKGfeeTuX8"}],"elseActions":[{"kind":"gotoplay","window":"MessageWnd","wndtype":"normal","objRef":{"type":"string","value":"_player.MsgScene_67inBV6rEzg.InvalidPromptSlide"}}]},{"kind":"gotoplay","window":"_current","wndtype":"normal","objRef":{"type":"string","value":"_player.66bquXjr8n9.6QjkEnrErnK"}}]},"ReviewInt_65V2lk8hD26":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"5yrIgFBBDTu"},"enabled":{"type":"boolean","value":false}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"6dKGfeeTuX8.$Status","typea":"property","valueb":"correct","typeb":"string"}},"thenActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"65V2lk8hD26_CorrectReview"}}],"elseActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"65V2lk8hD26_IncorrectReview"}}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_65V2lk8hD26","typea":"var","valueb":"5mmJO6GFXem","typeb":"string"}},"thenActions":[{"kind":"exe_actiongroup","id":"SetLayout_pxabnsnfns01001000001"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.5mmJO6GFXem.$Passed","typea":"property","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewIntCorrectIncorrect_65V2lk8hD26"}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.5mmJO6GFXem.$Passed","typea":"property","valueb":false,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewIntCorrectIncorrect_65V2lk8hD26"}]}]}]},"ReviewIntCorrectIncorrect_65V2lk8hD26":{"kind":"actiongroup","actions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"65V2lk8hD26_ReviewShape"}}]},"AnsweredInt_65V2lk8hD26":{"kind":"actiongroup","actions":[{"kind":"exe_actiongroup","id":"DisableChoices_65V2lk8hD26"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns01001000001"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns01001000001"}]}]},"DisableChoices_65V2lk8hD26":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"5yrIgFBBDTu"},"enabled":{"type":"boolean","value":false}}]},"65V2lk8hD26_CheckAnswered":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"or","statements":[{"kind":"compare","operator":"eq","valuea":"6dKGfeeTuX8.$Status","typea":"property","valueb":"correct","typeb":"string"},{"kind":"compare","operator":"eq","valuea":"_player.5mmJO6GFXem.$QuizComplete","typea":"property","valueb":true,"typeb":"boolean"}]}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_65V2lk8hD26"}],"elseActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"6dKGfeeTuX8.$Status","typea":"property","valueb":"incorrect","typeb":"string"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"gte","valuea":"6dKGfeeTuX8.$AttemptCount","typea":"property","valueb":1,"typeb":"number"}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_65V2lk8hD26"}]}]}]}]},"SetLayout_pxabnsnfns01001000001":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns01001000001"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns01001000001"}]}]},"NavigationRestrictionNextSlide_5aEMNj5mBGN":{"kind":"actiongroup","actions":[{"kind":"gotoplay","window":"_current","wndtype":"normal","objRef":{"type":"string","value":"_parent.6QjkEnrErnK"}}]},"NavigationRestrictionPreviousSlide_5aEMNj5mBGN":{"kind":"actiongroup","actions":[{"kind":"history_prev"}]}},"events":[{"kind":"onslidestart","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_playerVars.#hasPrevHistory","typea":"var","valueb":false,"typeb":"boolean"}},"thenActions":[{"kind":"enable_window_control","name":"previous","enable":false,"affectTabStop":true}]}]},{"kind":"onbeforeslidein","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"npnxnanbsnfns01001000001"}],"elseActions":[{"kind":"set_window_control_layout","name":"npnxnanbsnfns01001000001"}]}]},{"kind":"onsubmitslide","actions":[{"kind":"exe_actiongroup","id":"ActGrpOnSubmitButtonClick"}]},{"kind":"ontransitionin","actions":[{"kind":"if_action","condition":{"statement":{"kind":"and","statements":[{"kind":"compare","operator":"eq","valuea":"_player.#TimelineCompleted_5aEMNj5mBGN","typea":"var","valueb":false,"typeb":"boolean"},{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_65V2lk8hD26","typea":"var","valueb":false,"typeb":"boolean"}]}},"thenActions":[{"kind":"enable_window_control","name":"next","enable":false,"affectTabStop":false},{"kind":"enable_window_control","name":"swiperight","enable":false,"affectTabStop":false}]},{"kind":"adjustvar","variable":"_player.LastSlideViewed_67inBV6rEzg","operator":"set","value":{"type":"string","value":"_player."}},{"kind":"adjustvar","variable":"_player.LastSlideViewed_67inBV6rEzg","operator":"add","value":{"type":"property","value":"$AbsoluteId"}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#5mmJO6GFXem_TimerStopped","typea":"var","valueb":false,"typeb":"boolean"}},"thenActions":[{"kind":"starttimer","id":"_player.5mmJO6GFXem_timer"}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#5mmJO6GFXem_TimerExpired","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_65V2lk8hD26"}]},{"kind":"showtimer","id":"_player.5mmJO6GFXem_timer"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_65V2lk8hD26","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewInt_65V2lk8hD26"}],"elseActions":[{"kind":"exe_actiongroup","id":"65V2lk8hD26_CheckAnswered"}]},{"kind":"enable_window_control","name":"previous","enable":false,"affectTabStop":false}]},{"kind":"onnextslide","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_65V2lk8hD26","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_65V2lk8hD26","typea":"var","valueb":"5mmJO6GFXem","typeb":"string"}},"thenActions":[{"kind":"nextviewedslide","quizRef":{"type":"string","value":"_player.5mmJO6GFXem"},"completed_slide_ref":{"type":"string","value":"_player.5aryJtWyZ7T.60chWlRGsy1"},"status_filter":""}],"elseActions":[]}],"elseActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#RetryMode_65V2lk8hD26","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_65V2lk8hD26","typea":"var","valueb":"5mmJO6GFXem","typeb":"string"}},"thenActions":[{"kind":"nextviewedslide","quizRef":{"type":"string","value":"_player.5mmJO6GFXem"},"completed_slide_ref":{"type":"string","value":"_player.5aryJtWyZ7T.60chWlRGsy1"},"status_filter":""}],"elseActions":[]}],"elseActions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionNextSlide_5aEMNj5mBGN"}]}]}]},{"kind":"onprevslide","actions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionPreviousSlide_5aEMNj5mBGN"}]},{"kind":"ontimelinecomplete","actions":[{"kind":"adjustvar","variable":"_player.TimelineCompleted_5aEMNj5mBGN","operator":"set","value":{"type":"boolean","value":true}},{"kind":"enable_window_control","name":"next","enable":true,"affectTabStop":false},{"kind":"enable_window_control","name":"swiperight","enable":true,"affectTabStop":false}]}],"slideLayers":[{"enableSeek":true,"enableReplay":true,"timeline":{"duration":5000,"events":[{"kind":"ontimelinetick","time":0,"actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"65V2lk8hD26_ReviewShape"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"5yrIgFBBDTu"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6X2gWMOYA6s"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6FpL1b1HYzU"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6As0QTYzl0i"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6N8tMe1Z28P"}}]}]},"objects":[{"kind":"textinput","bindto":"_player.Question2","align":"left","verticalAlign":"top","rtl":false,"numeric":false,"multiline":true,"maxchars":0,"placeholder":"Type your answer here..","fontsize":16,"textcolor":"0x000000","bold":false,"italic":false,"font":"Open Sans Charset0_v9TY33EDE6F2","marginleft":10,"marginright":10,"margintop":0,"marginbottom":0,"shapemaskId":"","xPos":30,"yPos":220,"tabIndex":5,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":300.5,"rotateYPos":138.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":1,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"5yrIgFBBDTu","linkId":"","type":"vectortext","xPos":10,"yPos":5,"xAccOffset":0,"yAccOffset":0,"width":582,"height":278,"shadowIndex":-1,"scrollOverflow":false,"vectortext":{"left":0,"top":0,"right":180,"bottom":22,"pngfb":false,"pr":{"l":"Lib","i":156}}},"html5data":{"xPos":0,"yPos":0,"width":602,"height":278,"strokewidth":1}},"width":602,"height":278,"resume":true,"useHandCursor":true,"background":{"type":"vector","vectorData":{"left":-1,"top":-1,"right":603,"bottom":279,"altText":"Type your answer here..","pngfb":false,"pr":{"l":"Lib","i":155}}},"id":"5yrIgFBBDTu","events":[{"kind":"onlosefocus","actions":[{"kind":"adjustvar","variable":"_player.Question2","operator":"set","value":{"type":"property","value":"$Text"}}]},{"kind":"onkeypress","keycode":13,"shift":false,"ctrl":false,"alt":false,"actions":[{"kind":"exe_actiongroup","id":"_parent.ActGrpOnSubmitButtonClick"}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6X2gWMOYA6s_1729974649","id":"01","linkId":"txt__default_6X2gWMOYA6s","type":"acctext","xPos":10,"yPos":5,"xAccOffset":10,"yAccOffset":5,"width":610,"height":153,"valign":"top","wordwrap":true,"textshadow":false,"shadowIndex":-1,"scrollOverflow":false,"vartext":{"blocks":[{"spans":[{"text":"2. Which of the following examples will run faster?\\n","style":{"fontFamily":"\\"Open Sans Charset0_v9TY33EDE6F2\\",\\"Open Sans\\"","ascent":17.102,"descent":4.688,"leading":0,"underlinePosition":-1.203,"underlineThickness":0.797,"xHeight":8.563}}],"style":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","lineSpacingRule":"single","lineSpacing":20,"spacingBefore":0,"spacingAfter":0,"listStyle":{"listType":"none","listTypeFormat":"parentheses","size":100,"bulletFont":"Arial","color":"#000000"},"tagType":"P"},"runs":[{"idx":0,"len":52,"flowDirection":"leftToRight","cursive":false}]},{"spans":[{"text":"\\n","style":{"fontFamily":"\\"Open Sans Charset0_v9TY33EDE6F2\\",\\"Open Sans\\"","ascent":17.102,"descent":4.688,"leading":0,"underlinePosition":-1.203,"underlineThickness":0.797,"xHeight":8.563}}],"style":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","lineSpacingRule":"single","lineSpacing":20,"spacingBefore":0,"spacingAfter":0,"listStyle":{"listType":"none","listTypeFormat":"parentheses","size":100,"bulletFont":"Arial","color":"#000000"},"tagType":"P"},"runs":[{"idx":0,"len":1,"flowDirection":"leftToRight","cursive":false}]},{"spans":[{"text":"1. 1000 GameObjects, each with a MonoBehaviour implementing the Update callback.\\n","style":{"fontFamily":"\\"Open Sans Charset0_v9TY33EDE6F2\\",\\"Open Sans\\"","ascent":17.102,"descent":4.688,"leading":0,"underlinePosition":-1.203,"underlineThickness":0.797,"xHeight":8.563}}],"style":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","lineSpacingRule":"single","lineSpacing":20,"spacingBefore":0,"spacingAfter":0,"listStyle":{"listType":"none","listTypeFormat":"parentheses","size":100,"bulletFont":"Arial","color":"#000000"},"tagType":"P"},"runs":[{"idx":0,"len":81,"flowDirection":"leftToRight","cursive":false}]},{"spans":[{"text":"2. One GameObject with one MonoBehaviour with an Array of 1000 classes, each implementing a custom Update() callback.\\n","style":{"fontFamily":"\\"Open Sans Charset0_v9TY33EDE6F2\\",\\"Open Sans\\"","ascent":17.102,"descent":4.688,"leading":0,"underlinePosition":-1.203,"underlineThickness":0.797,"xHeight":8.563}}],"style":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","lineSpacingRule":"single","lineSpacing":20,"spacingBefore":0,"spacingAfter":0,"listStyle":{"listType":"none","listTypeFormat":"parentheses","size":100,"bulletFont":"Arial","color":"#000000"},"tagType":"P"},"runs":[{"idx":0,"len":118,"flowDirection":"leftToRight","cursive":false}]},{"spans":[{"text":"Explain your answer.","style":{"fontFamily":"\\"Open Sans Charset0_v9TY33EDE6F2\\",\\"Open Sans\\"","ascent":17.102,"descent":4.688,"leading":0,"underlinePosition":-1.203,"underlineThickness":0.797,"xHeight":8.563}}],"style":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","lineSpacingRule":"single","lineSpacing":20,"spacingBefore":0,"spacingAfter":0,"listStyle":{"listType":"none","listTypeFormat":"parentheses","size":100,"bulletFont":"Arial"},"tagType":"P"},"runs":[{"idx":0,"len":20,"flowDirection":"leftToRight","cursive":false}]}],"defaultBlockStyle":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","defaultTabStop":48,"listLevel":0,"lineSpacingRule":"multiple","lineSpacing":20,"indentSize":36,"spacingBefore":0,"spacingAfter":0,"baseSpanStyle":{"fontFamily":"Open Sans","fontSize":12,"fontIsBold":false,"fontIsItalic":false,"fontIsUnderline":false,"fontIsStrikeout":false,"underlineStyle":"normal","elevation":"normal","spacing":0,"ignoreKerningTable":false,"displayCase":"asIs","languageId":0,"foregroundColor":"#000000","linkColor":"#0000FF"},"listStyle":{"listType":"none","listTypeFormat":"plain","start":0,"size":100}},"direction":"horizontal"},"vectortext":{"left":0,"top":0,"right":616,"bottom":158,"pngfb":false,"pr":{"l":"Lib","i":163}}}],"shapemaskId":"","xPos":32,"yPos":51,"tabIndex":4,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":315,"rotateYPos":81.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":2,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":630,"bottom":163,"altText":"2. Which of the following examples will run faster?\\n\\n1. 1000 GameObjects, each with a MonoBehaviour implementing the Update callback.\\n2. One GameObject with one MonoBehaviour with an Array of 1000 classes, each implementing a custom Update() callback.\\nExplain your answer.","pngfb":false,"pr":{"l":"Lib","i":162}},"html5data":{"xPos":0,"yPos":0,"width":630,"height":163,"strokewidth":0}},"width":630,"height":163,"resume":true,"useHandCursor":true,"id":"6X2gWMOYA6s"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","shapemaskId":"","xPos":0,"yPos":30,"tabIndex":2,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":57.5,"rotateYPos":4.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":3,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":117,"bottom":11,"altText":"Rectangle 1","pngfb":false,"pr":{"l":"Lib","i":6}},"html5data":{"xPos":0,"yPos":0,"width":116,"height":10,"strokewidth":1}},"width":116,"height":10,"resume":true,"useHandCursor":true,"id":"6FpL1b1HYzU"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6As0QTYzl0i_917195557","id":"01","linkId":"txt__default_6As0QTYzl0i","type":"acctext","xPos":10,"yPos":5,"xAccOffset":10,"yAccOffset":5,"width":349,"height":36,"valign":"center","wordwrap":true,"textshadow":false,"shadowIndex":-1,"scrollOverflow":false,"vartext":{"blocks":[{"spans":[{"text":"Part-2 Open Ended Questions","style":{"fontFamily":"\\"ArialBold Charset0_Bold3D70FAD3\\",\\"Arial\\"","fontSize":14,"fontIsBold":false,"fontIsUnderline":false,"ascent":16.898,"descent":3.956,"leading":0.611,"underlinePosition":-1.978,"underlineThickness":1.96,"xHeight":9.68}}],"style":{"justification":"left","tagType":"P"},"runs":[{"idx":0,"len":27,"flowDirection":"leftToRight","cursive":false}]}],"defaultBlockStyle":{"flowDirection":"leftToRight","leadingMargin":0,"trailingMargin":0,"firstLineMargin":0,"justification":"left","defaultTabStop":48,"listLevel":0,"lineSpacingRule":"multiple","lineSpacing":20,"indentSize":36,"spacingBefore":0,"spacingAfter":0,"baseSpanStyle":{"fontFamily":"Open Sans","fontSize":12,"fontIsBold":false,"fontIsItalic":false,"fontIsUnderline":false,"fontIsStrikeout":false,"underlineStyle":"normal","elevation":"normal","spacing":0,"ignoreKerningTable":false,"displayCase":"asIs","languageId":0,"foregroundColor":"#000000","linkColor":"#0000FF"},"listStyle":{"listType":"none","listTypeFormat":"plain","start":0,"size":100}},"direction":"horizontal"},"vectortext":{"left":0,"top":0,"right":275,"bottom":35,"pngfb":false,"pr":{"l":"Lib","i":159}}}],"shapemaskId":"","xPos":116,"yPos":12,"tabIndex":1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":184.5,"rotateYPos":23,"scaleX":100,"scaleY":100,"alpha":100,"depth":4,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":369,"bottom":46,"altText":"Part-2 Open Ended Questions","pngfb":false,"pr":{"l":"Lib","i":7}},"html5data":{"xPos":0,"yPos":0,"width":369,"height":46,"strokewidth":0}},"width":369,"height":46,"resume":true,"useHandCursor":true,"id":"6As0QTYzl0i"},{"kind":"vectorshape","rotation":0,"accType":"image","cliptobounds":false,"defaultAction":"","imagelib":[{"kind":"imagedata","assetId":1,"id":"01","url":"story_content/6MinqcPh7rf_80_DX1064_DY1064.swf","type":"normal","altText":"Template.png","width":43,"height":532,"mobiledx":0,"mobiledy":0}],"shapemaskId":"","xPos":677,"yPos":0,"tabIndex":0,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":21.5,"rotateYPos":270,"scaleX":100,"scaleY":100,"alpha":100,"depth":5,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":43,"bottom":540,"altText":"Template.png","pngfb":false,"pr":{"l":"Lib","i":1}},"html5data":{"xPos":0,"yPos":0,"width":43,"height":540,"strokewidth":0}},"width":43,"height":540,"resume":true,"useHandCursor":true,"id":"6N8tMe1Z28P"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"65V2lk8hD26_CorrectReview","id":"01","linkId":"65V2lk8hD26_CorrectReview","type":"vectortext","xPos":0,"yPos":0,"xAccOffset":0,"yAccOffset":0,"width":0,"height":0,"shadowIndex":-1,"scrollOverflow":false,"vectortext":{"left":0,"top":0,"right":402,"bottom":37,"pngfb":false,"pr":{"l":"Lib","i":46}}}],"shapemaskId":"","xPos":0,"yPos":500,"tabIndex":7,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":6,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Correct","pngfb":false,"pr":{"l":"Lib","i":45}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"65V2lk8hD26_CorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"65V2lk8hD26_IncorrectReview","id":"01","linkId":"65V2lk8hD26_IncorrectReview","type":"vectortext","xPos":0,"yPos":0,"xAccOffset":0,"yAccOffset":0,"width":0,"height":0,"shadowIndex":-1,"scrollOverflow":false,"vectortext":{"left":0,"top":0,"right":411,"bottom":37,"pngfb":false,"pr":{"l":"Lib","i":48}}}],"shapemaskId":"","xPos":0,"yPos":500,"tabIndex":8,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":7,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Incorrect","pngfb":false,"pr":{"l":"Lib","i":47}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"65V2lk8hD26_IncorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"txt_65V2lk8hD26_ReviewShape","id":"01","linkId":"txt_65V2lk8hD26_ReviewShape","type":"vectortext","altText":"","xPos":0,"yPos":0,"xAccOffset":0,"yAccOffset":0,"width":0,"height":0,"shadowIndex":-1,"scrollOverflow":false,"vectortext":{"left":0,"top":0,"right":683,"bottom":676,"pngfb":false,"pr":{"l":"Lib","i":165}}}],"shapemaskId":"","xPos":0,"yPos":0,"tabIndex":6,"tabEnabled":false,"xOffset":0,"yOffset":0,"rotateXPos":330,"rotateYPos":240,"scaleX":100,"scaleY":100,"alpha":100,"depth":8,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":700,"bottom":681,"altText":"","pngfb":false,"pr":{"l":"Lib","i":164}},"html5data":{"xPos":1,"yPos":1,"width":698,"height":679,"strokewidth":1}},"width":660,"height":480,"resume":false,"useHandCursor":true,"id":"65V2lk8hD26_ReviewShape"}],"startTime":-1,"elapsedTimeMode":"normal","useHandCursor":false,"resume":true,"kind":"slidelayer","isBaseLayer":true}]}');