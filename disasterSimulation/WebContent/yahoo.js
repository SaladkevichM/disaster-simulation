(function() {
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;
		
		function onMenuItemClick(p_sType, p_aArgs, p_oValue) {

			/*
			YAHOO.log(("index: " + this.index + 
					   ", text: " + this.cfg.getProperty("text") + 
					   ", value: " + p_oValue), "info", "example9");
			*/
		}

        var initTopMenu = function() {
                /*
                     Instantiate a MenuBar:  The first argument passed to the 
                     constructor is the id of the element in the page 
                     representing the MenuBar; the second is an object literal 
                     of configuration properties.
                */

                var oMenuBar = new YAHOO.widget.MenuBar("productsandservices", { 
                                                            autosubmenudisplay: false, 
                                                            hidedelay: 250, 
                                                            lazyload: false,
                                                            effect: { 
                                                                effect: YAHOO.widget.ContainerEffect.FADE,
                                                                duration: 0.25
                                                            } 
                                                        });

                /*
                     Define an array of object literals, each containing 
                     the data necessary to create a submenu.
                */

                var aSubmenuData = [
                
                    {
                        id: "1", 
                        itemdata: [ 
                            { text: "Пуск", url: "#"},                            
                            { text: "Стоп", url: "#"},
							{ text: "Сброс", url: "#"},
							{ text: "Настройки", url: "#"}
                        ]
                    },
					
					 {
                        id: "2", 
                        itemdata: [ 
                            { text: "Ручное управление", url: "#"},                            
                            { text: "Авто", url: "#"}
                        ]
                    },


                    {
                        id: "3", 
                        itemdata: [
                            { text: "Ситуация 1", url: "#" },
							{ text: "Ситуация 2", url: "#" },
							{ text: "Ситуация 3", url: "#" },
							{ text: "Ситуация 4", url: "#" },
							{ text: "Ситуация 5", url: "#" },
							{ text: "Ситуация 6", url: "#" },
							{ text: "Ситуация 7", url: "#" },
							{ text: "Ситуация 8", url: "#" },
							{ text: "Ситуация 9", url: "#" }
                   
                        ]    
                    },
                    
                    {
                        id: "4", 
                        itemdata: [
							{ text: "Потоки", url: "#" },
							{ text: "Инструкция", url: "#" },
                            { text: "О программе", url: "#" }							             
                        ] 
                    },
                                      
                ];


                /*
                     Subscribe to the "beforerender" event, adding a submenu 
                     to each of the items in the MenuBar instance.
                
*/
                oMenuBar.subscribe("beforeRender", function () {

                    if (this.getRoot() == this) {

                        this.getItem(0).cfg.setProperty("submenu", aSubmenuData[0]);
                        this.getItem(1).cfg.setProperty("submenu", aSubmenuData[1]);
                        this.getItem(2).cfg.setProperty("submenu", aSubmenuData[2]);
						this.getItem(3).cfg.setProperty("submenu", aSubmenuData[3]);
                    }

                });
				

                /*
                     Call the "render" method with no arguments since the 
                     markup for this MenuBar instance is already exists in 
                     the page.
                */
				
				// Define a handler for the "click" event
 
				function onClick(p_sType, p_aArgs) {  
			 
					var oEvent = p_aArgs[0],    // DOM Event
						oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
			 
					// If a MenuItem was clicked, alert the value of its text label
			 
					if (oMenuItem) {
			 
						//alert(oMenuItem.cfg.getProperty("text"));
						
						switch(oMenuItem.cfg.getProperty("text"))
						{
							case 'Ситуация 1':
								eventManager(1);
							break;
							case 'Ситуация 2':
								eventManager(2);
							break;
							case 'Ситуация 3':
								eventManager(3);
							break;
							case 'Ситуация 4':
								eventManager(4);
							break;
							case 'Ситуация 5':
								eventManager(5);
							break;
							case 'Ситуация 6':
								eventManager(6);
							break;
							case 'Ситуация 7':
								eventManager(7);
							break;
							case 'Ситуация 8':
								eventManager(8);
							break;
							case 'Ситуация 9':
								eventManager(9);
							break;
							case 'Пуск':
								eventManager(10);
							break;
							case 'Стоп':
								eventManager(11);
							break;
							case 'Потоки':
								eventManager(12);
							break;
							case 'О программе':
								eventManager(13);
							break;
							case 'Сброс':
								eventManager(14);
							break;
							case 'Ручное управление':
								eventManager(15);
							break;
							case 'Авто':
								eventManager(16);
							break;
							case 'Настройки':
								eventManager(17);
							break;
							case 'Инструкция':
								eventManager(18);
							break;
						}
			 
					}
			 
				}
			 
			 
				function mOver(p_sType, p_aArgs)
				{
					var oEvent = p_aArgs[0],    // DOM Event
						oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
			 
					// If a MenuItem was clicked, alert the value of its text label
			 
					//if (oMenuItem) {
			 
						if(oMenuItem.cfg.getProperty("text") != 'Потоки' && oMenuItem.cfg.getProperty("text") != 'О программе' && oMenuItem.cfg.getProperty("text") != 'Пуск' && oMenuItem.cfg.getProperty("text") != 'Стоп' && oMenuItem.cfg.getProperty("text") != 'Сброс')
						{
						
							switch(oMenuItem.cfg.getProperty("text"))
							{
								case 'Ситуация 1':
									tooltip.show('Пожар в сушильной части', 200);
								break;
								case 'Ситуация 2':
									tooltip.show('Аварийная обрывность полотна из-за конденсации паров воды на ложном потолке («капель»)', 600);
								break;
								case 'Ситуация 3':
									tooltip.show('Аварийный сброс из-за переполнения бассейна оборотного брака («рвачка» на машине)', 400);
								break;
								case 'Ситуация 4':
									tooltip.show('Низкий рН речной  воды (высокая кислотность)', 200);
								break;
								case 'Ситуация 5':
									tooltip.show('Высокий рН речной воды (высокая щелочность)', 200);
								break;
								case 'Ситуация 6':
									tooltip.show('Холодная речная вода', 200);
								break;
								case 'Ситуация 7':
									tooltip.show('Холодный воздух', 200);
								break;
								case 'Ситуация 8':
									tooltip.show('Горячий воздух', 200);
								break;
								case 'Ситуация 9':
									tooltip.show('Слизеобразование', 200);
								break;
								case 'Пуск':
									tooltip.show('Пожар в сушильной части', 200);
								break;
								case 'Стоп':
									tooltip.show('Пожар в сушильной части', 200);
								break;
								case 'Потоки':
									tooltip.show('Пожар в сушильной части', 200);
								break;
								case 'О программе':
									tooltip.show('Пожар в сушильной части', 200);
								break;
								case 'Сброс':
									tooltip.show('Пожар в сушильной части', 200);
								break;
							}
						}
			 
					//}
				}
				
				function mOut(p_sType, p_aArgs)
				{
					var oEvent = p_aArgs[0],    // DOM Event
						oMenuItem = p_aArgs[1];
						
					tooltip.hide();

				}
			 
				// Subscribe to the "click" event
				oMenuBar.subscribe("mouseover", mOver);
				oMenuBar.subscribe("mouseout", mOut);
				oMenuBar.subscribe("click", onClick);
				
                oMenuBar.render();         
        };

    Event.onDOMReady(function() {
	
	// creating windows
        var layout = new YAHOO.widget.Layout({
            units: [
                { position: 'top', height: 28, body: 'top1', scroll: null, zIndex: 2 },            
                //{ position: 'bottom', height: 30, body: 'bottom1' },
                { position: 'left', header: 'Текущая ситуация', width: 195, body: 'left1', gutter: '5', scroll: true, zIndex: 1 },
                { position: 'center', body: 'center1', gutter: '5 0', scroll:true}
				//{ position: 'right',  header: 'Качество продукции', width: 200, body: 'right', scroll:true, collapse:true, gutter: '5'}
            ]
        });
        
        layout.on('render', function() {
            YAHOO.util.Event.onContentReady("productsandservices", initTopMenu);
			var el = layout.getUnitByPosition('center').get('wrap');
				var layout2 = new YAHOO.widget.Layout(el, {
					parent: layout,
					units: [
						{ position: 'top',  header: 'Управляющие воздействия',  body: 'center2'}
					]
				});
				layout2.render();			
        });        
        layout.render();
		//layout.getUnitByPosition('right').collapse();		
    });			
	
})();
