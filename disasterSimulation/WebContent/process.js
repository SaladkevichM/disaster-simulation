	window.requestAnimFrame = (function(callback){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
	})();	
	
	// ================== define global variable for canvas ==================
	
	var canvas = null;
	var context = null;
	var time = null;
	var launch = false;	
	var colors;	
	var threadsInfoShow = false;
	var programInfoShow = false;
	var mode = 'Ручное управление';
	var launchMoreSituations = true;
	var delayTimer1 = null;
	var stopNumbers = false;
	var maxLaunchedSituations = 2;	
	var delay_between_disaster = 4000;
	var twoSec = 0;
	var fireImage = null;
	var xOffset = 1;
	var scaleVar = 1.0;
	var slider;
	
	var S = new Array(); // situations
	
		S[1] = new Array();
		S[1][1] = false; // true if situation started
		S[1][2] = "Пожар в сушильной части";
		S[1][3] = "Отключить вентиляцию";
		S[1][4] = null;
		S[1][5] = new Array(2,3,4,5,6,7,8,9);
		
		S[2] = new Array();
		S[2][1] = false;
		S[2][2] = "Аварийная обрывность полотна из-за конденсации паров воды на ложном потолке («капель»)";
		S[2][3] = "Нагреть потолок";
		S[2][4] = null;
		S[2][5] = new Array(7);
		
		S[3] = new Array();
		S[3][1] = false;
		S[3][2] = "Аварийный сброс из-за переполнения бассейна оборотного брака («рвачка» на машине)";
		S[3][3] = "Уменьшить расход сырья; увеличить расход брака; снизить степень помола; повысить скорость";
		S[3][4] = null;
		S[3][5] = new Array();
		
		S[4] = new Array();
		S[4][1] = false;
		S[4][2] = "Низкий рН речной  воды (высокая кислотность)";
		S[4][3] = "Увеличить расход деминерализованной воды";
		S[4][4] = null;
		S[4][5] = new Array(5);
		
		S[5] = new Array();
		S[5][1] = false;
		S[5][2] = "Высокий рН речной воды (высокая щелочность)";
		S[5][3] = "Увеличить расход оборотной воды";
		S[5][4] = null;
		S[5][5] = new Array(4);
		
		S[6] = new Array();
		S[6][1] = false;
		S[6][2] = "Холодная речная вода";
		S[6][3] = "Снизить расход полимера и волокна";
		S[6][4] = null;
		S[6][5] = new Array();
		
		S[7] = new Array();
		S[7][1] = false;
		S[7][2] = "Холодный воздух";
		S[7][3] = "Подключить калорифер";
		S[7][4] = null;
		S[7][5] = new Array(8);
		
		S[8] = new Array();
		S[8][1] = false;
		S[8][2] = "Горячий воздух";
		S[8][3] = "Отключить II  и III стадии регенерационного теплообменника ";
		S[8][4] = null;
		S[8][5] = new Array(7,2);
		
		S[9] = new Array();
		S[9][1] = false;
		S[9][2] = "Слизеобразование";
		S[9][3] = "Увеличить расход речной воды";
		S[9][4] = null;
		S[9][5] = new Array();
		
	var Stimes = new Array();
		Stimes[1] = null; 
		Stimes[2] = null;
		Stimes[3] = null;
		Stimes[4] = null;
		Stimes[5] = null;
		Stimes[6] = null;
		Stimes[7] = null;
		Stimes[8] = null;
		Stimes[9] = null;
			
	// =============== Диалог с пользователем ======================
	
	var dialogsCount = 0;
	
	var dialogPositions = new Array();
		dialogPositions[1] = new Array(1080,710);
		dialogPositions[2] = new Array(1080,540);
		dialogPositions[3] = new Array(1080,390);
		dialogPositions[4] = new Array(1080,240);			
		dialogPositions[4] = new Array(1080,90);
	
	// =============== Текущая ситуация ============================
	
	var U = new Array();
	
	U[1] = new Array(); 
			U[1][0] = "Температура воздуха";
			U[1][1] = -20;
			U[1][2] = null;
			U[1][3] = 35; 
			U[1][4] = 0; // current value 
			U[1][5] = 1;
		U[2] = new Array(); 
			U[2][0] = "Температура в машинном зале";
			U[2][1] = 18;
			U[2][2] = null;
			U[2][3] = 28; 
			U[2][4] = 0; // current value
			U[2][5] = 0;
		U[3] = new Array(); 
			U[3][0] = "Температура в ложном потолке";
			U[3][1] = 20;
			U[3][2] = null;
			U[3][3] = 35; 
			U[3][4] = 0; // current value
			U[3][5] = 1;
		U[4] = new Array(); 
			U[4][0] = "Температура в колпаке";
			U[4][1] = 95;
			U[4][2] = null;
			U[4][3] = 150; 
			U[4][4] = 0; // current value
			U[4][5] = 0;
		U[5] = new Array(); 
			U[5][0] = "Температура речной воды";
			U[5][1] = 5;
			U[5][2] = null;
			U[5][3] = 25; 
			U[5][4] = 0; // current value
			U[5][5] = 1;
		U[6] = new Array(); 
			U[6][0] = "рН речной воды";
			U[6][1] = 3;
			U[6][2] = null;
			U[6][3] = 9; 
			U[6][4] = 0; // current value
			U[6][5] = 0;
		U[7] = new Array(); 
			U[7][0] = "Уровень в бассейне брака";
			U[7][1] = 0.2;
			U[7][2] = null;
			U[7][3] = 0.9; 
			U[7][4] = 0; // current value
			U[7][5] = 0;
		U[8] = new Array(); 
			U[8][0] =  "Цена энергии, 1/квтч";
			U[8][1] = 2;
			U[8][2] = null;
			U[8][3] = 15; 
			U[8][4] = 0; // current value
			U[8][5] = 1;
		U[9] = new Array(); 
			U[9][0] = "Цена речной воды, 1/1000 м3";
			U[9][1] = 0.5;
			U[9][2] = null;
			U[9][3] = 3.5 
			U[9][4] = 0; // current value
			U[9][5] = 0;
		U[10] = new Array(); 
			U[10][0] = "Цена сброса, 1/кг";
			U[10][1] = 0.3;
			U[10][2] = null;
			U[10][3] = 1.5;
			U[10][4] = 0; // current value
			U[10][5] = 1;
		U[11] = new Array(); 
			U[11][0] = "Дебет реки, м3/с";
			U[11][1] = 5;
			U[11][2] = null;
			U[11][3] = 50; 
			U[11][4] = 0; // current value
			U[11][5] = 0;
		U[12] = new Array(); 
			U[12][0] = "Концентрация стока";
			U[12][1] = 0.05;
			U[12][2] = null;
			U[12][3] = 0.15; 
			U[12][4] = 0; // current value
			U[12][5] = 1;
	
	// =============================================================
	
	// =============== приборы =====================
	
	var R = new Array();
	
		R[1] = new Array(); // расход сырья
			R[1][0] = "1. Расход сырья";
			R[1][1] = 350; // start value
			R[1][2] = null;
			R[1][3] = 100; // min
			R[1][4] = 700; // max			
			R[1][5] = 350; // default
			R[1][6] = false; // indicate to change manual
		R[2] = new Array(); // расход оборотного брака
			R[2][0] = "2. Расход брака";
			R[2][1] = 75;
			R[2][2] = null;
			R[2][3] = 50;
			R[2][4] = 150; 
			R[2][5] = 75; 			
			R[2][6] = false;
		R[3] = new Array(); // расход полимера
			R[3][0] = "3. Расх. полим.";
			R[3][1] = 60;
			R[2][2] = null;
			R[3][3] = 50; 
			R[3][4] = 150;
			R[3][5] = 60; 			
			R[3][6] = false; 
		R[4] = new Array(); // расход волокна
			R[4][0] = "4. Расх. волокна";
			R[4][1] = 150;
			R[4][2] = null;
			R[4][3] = 100; 
			R[4][4] = 200; 
			R[4][5] = 150;
			R[4][6] = false;
		R[5] = new Array(); // степень помола
			R[5][0] = "5. Степ. помола";
			R[5][1] = 35;
			R[5][2] = null;
			R[5][3] = 15; 
			R[5][4] = 65;
			R[5][5] = 35; 			
			R[5][6] = false; 
		R[6] = new Array(); // конц при формовании
			R[6][0] = "6.Конц. при форм.";
			R[6][1] = 1.2;
			R[6][2] = null;
			R[6][3] = 0.5; 
			R[6][4] = 1.8; 
			R[6][5] = 1.2; 
			R[6][6] = false;
		R[7] = new Array(); // расход речной воды
			R[7][0] = "7. Расход воды";
			R[7][1] = 70;
			R[7][2] = null;
			R[7][3] = 25; 
			R[7][4] = 95;
			R[7][5] = 70;
			R[7][6] = false;
		R[8] = new Array(); // скорость
			R[8][0] =  "8. Скорость маш.";
			R[8][1] = 150;
			R[8][2] = null;
			R[8][3] = 150; 
			R[8][4] = 250; 
			R[8][5] = 150; 
			R[8][6] = false;
		R[9] = new Array(); // расход воздуха на 1 ступень
			R[9][0] = "9. Воздух 1ст";
			R[9][1] = 60;
			R[9][2] = null;
			R[9][3] = 0;
			R[9][4] = 90;
			R[9][5] = 60;
			R[9][6] = false; 			
		R[10] = new Array(); // расход воздуха на 2 ступень
			R[10][0] = "10. Воздух 2ст";
			R[10][1] = 55;
			R[10][2] = null;
			R[10][3] = 0; 
			R[10][4] = 70; 
			R[10][5] = 55; 
			R[10][6] = false;
		R[11] = new Array(); // расход воздуха на 3 ступень
			R[11][0] = "11. Воздух 3ст";
			R[11][1] = 70;
			R[11][2] = null;
			R[11][3] = 60; 
			R[11][4] = 100; 
			R[11][5] = 70;
			R[11][6] = false;
	// =============================================================
	
	var vars = new Array(); // vars for canvas elements	
	
	vars[1] = new Array();
					vars[1][0] = 1;
					vars[1][1] = "Гидроразбиватель";
					vars[1][2] = true;
					vars[1][3] = null;

	vars[2] = new Array();
					vars[2][0] = 2;
					vars[2][1] = "Мельница I ступени размола";
					vars[2][2] = true;
					vars[2][3] = null;
					
	vars[3] = new Array();
					vars[3][0] = 3;
					vars[3][1] = "Мельница II ступени размола";
					vars[3][2] = true;
					vars[3][3] = null;
					
	vars[4] = new Array();
					vars[4][0] = 4;
					vars[4][1] = "Напорный ящик бумагоделательной машины";
					vars[4][2] = true;
					vars[4][3] = null;
					
	vars[5] = new Array();
					vars[5][0] = 5;
					vars[5][1] = "Сеточный стол";
					vars[5][2] = true;
					vars[5][3] = null;
					
	vars[6] = new Array();
					vars[6][0] = 6;
					vars[6][1] = "Прессовая часть";
					vars[6][2] = true;
					vars[6][3] = null;
					
	vars[7] = new Array();
					vars[7][0] = 7;
					vars[7][1] = "Накат";
					vars[7][2] = true;
					vars[7][3] = null;
					
	
	vars[8] = new Array();
					vars[8][0] = 8;
					vars[8][1] = "Сушильная часть";
					vars[8][2] = true;
					vars[8][3] = null;
	vars[9] = new Array();
					vars[9][0] = 9;
					vars[9][1] = "I ступень регенерационного теплообменника";
					vars[9][2] = true;
					vars[9][3] = null;
	vars[10] = new Array();
					vars[10][0] = 10;
					vars[10][1] = "II ступень регенерационного теплообменника";
					vars[10][2] = true;
					vars[10][3] = null;
	vars[11] = new Array();
					vars[11][0] = 11;
					vars[11][1] = "III ступень регенерационного теплообменника";
					vars[11][2] = true;
					vars[11][3] = null;
	vars[12] = new Array();
					vars[12][0] = 12;
					vars[12][1] = "Object 12";
					vars[12][2] = true;
					vars[12][3] = null;
	vars[13] = new Array();
					vars[13][0] = 13;
					vars[13][1] = "Приемный бассейн волокнистой массы";
					vars[13][2] = true;
					vars[13][3] = null;
	vars[14] = new Array();
					vars[14][0] = 14;
					vars[14][1] = "Расходный бак коагулянта";
					vars[14][2] = true;
					vars[14][3] = null;
	vars[15] = new Array();
					vars[15][0] = 15;
					vars[15][1] = "Расходный бак полимерной упрочняющей добавки";
					vars[15][2] = true;
					vars[15][3] = null;
	vars[16] = new Array();
					vars[16][0] = 16;
					vars[16][1] = "Расходный бак волокнистой упрочняющей добавки";
					vars[16][2] = true;
					vars[16][3] = null;
	vars[17] = new Array();
					vars[17][0] = 17;
					vars[17][1] = "Непрерывный проточный смеситель";
					vars[17][2] = true;
					vars[17][3] = "";
	vars[18] = new Array();
					vars[18][0] = 18;
					vars[18][1] = "Бассейн размолотой массы";
					vars[18][2] = true;
					vars[18][3] = null;

	vars[19] = new Array();
					vars[19][0] = 19;
					vars[19][1] = "Бак постоянного уровня";
					vars[19][2] = true;
					vars[19][3] = null;
	
	vars[20] = new Array();
					vars[20][0] = 20;
					vars[20][1] = "Сборники оборотных вод";
					vars[20][2] = true;
					vars[20][3] = null;

	vars[21] = new Array();
					vars[21][0] = 21;
					vars[21][1] = "Вихревые очистители";
					vars[21][2] = true;
					vars[21][3] = null;

	vars[22] = new Array();
					vars[22][0] = 22;
					vars[22][1] = "Непрерывный проточный смеситель";
					vars[22][2] = true;
					vars[22][3] = null;	

	vars[23] = new Array();
					vars[23][0] = 23;
					vars[23][1] = "Сборник речной воды";
					vars[23][2] = true;
					vars[23][3] = null;

	vars[24] = new Array();
					vars[24][0] = 24;
					vars[24][1] = "Узел деминерализации";
					vars[24][2] = true;
					vars[24][3] = null;
					
	vars[25] = new Array();
					vars[25][0] = 25;
					vars[25][1] = "Гидроразбиватель брака";
					vars[25][2] = true;
					vars[25][3] = null;
					
	vars[26] = new Array();
					vars[26][0] = 26;
					vars[26][1] = "Сборник подготовленной технологической воды";
					vars[26][2] = true;
					vars[26][3] = null;
					
	vars[27] = new Array();
					vars[27][0] = 27;
					vars[27][1] = "Object 27";
					vars[27][2] = true;
					vars[27][3] = null;
	
	
				
	var threads = new Array(); // vars for threads
	
	threads[1] = new Array();
					threads[1][0] = 1; 
					threads[1][1] = "Выхлоп охлажденной газовоздушной смеси из регенерационного теплообменника"; 
					threads[1][2] = true; 
					threads[1][3] = "Blue";	 
	threads[2] = new Array();
					threads[2][0] = 2; 
					threads[2][1] = "Подача атмосферного воздуха на I ступень регенерационного теплообменника"; 
					threads[2][2] = true; 
					threads[2][3] = "Blue";						
	threads[3] = new Array();
					threads[3][0] = 3; 
					threads[3][1] = "Охлажденный II ступени воздух на I ступень регенерационного теплообменника"; 
					threads[3][2] = true; 
					threads[3][3] = "Blue"; 					
	threads[4] = new Array();
					threads[4][0] = 4; 
					threads[4][1] = "Подогретый на II ступени воздух в ложный потолок"; 
					threads[4][2] = true; 
					threads[4][3] = "Blue"; 
	threads[5] = new Array();
					threads[5][0] = 5; 
					threads[5][1] = "Воздух из машинного зала на II ступень теплообменника"; 
					threads[5][2] = true; 
					threads[5][3] = "Blue";	 			
	threads[6] = new Array();
					threads[6][0] = 6; 
					threads[6][1] = "Воздух после III ступени на II ступень"; 
					threads[6][2] = true; 
					threads[6][3] = "Blue";	
	threads[7] = new Array();
					threads[7][0] = 7; 
					threads[7][1] = "Воздух из ложного потолка на III ступень"; 
					threads[7][2] = true; 
					threads[7][3] = "Blue";	
	threads[8] = new Array();
					threads[8][0] = 8; 
					threads[8][1] = "Горячая паровоздушная смесь на III ступень теплообменника"; 
					threads[8][2] = true; 
					threads[8][3] = "Blue";	
	threads[9] = new Array();
					threads[9][0] = 9; 
					threads[9][1] = "Подогретый атмосферный воздух в машинный зал"; 
					threads[9][2] = true; 
					threads[9][3] = "Blue";	 
	threads[10] = new Array();
					threads[10][0] = 10; 
					threads[10][1] = "Самый горячий воздух в колпак сушильного цилиндра"; 
					threads[10][2] = true; 
					threads[10][3] = "Blue";	 
	threads[11] = new Array();
					threads[11][0] = 11; 
					threads[11][1] = "Технологическая вода на гидроразбиватель целлюлозы"; 
					threads[11][2] = true; 
					threads[11][3] = "Green"; 
	threads[12] = new Array();
					threads[12][0] = 12; 
					threads[12][1] = "Поток сырья"; 
					threads[12][2] = true; 
					threads[12][3] = "Orange"; 
	threads[13] = new Array();
					threads[13][0] = 13; 
					threads[13][1] = "Речная вода на промывку машины"; 
					threads[13][2] = true; 
					threads[13][3] = "Green"; 
	threads[14] = new Array();
					threads[14][0] = 14; 
					threads[14][1] = "Готовая продукция"; 
					threads[14][2] = true; 
					threads[14][3] = "Orange"; 
	threads[15] = new Array();
					threads[15][0] = 15; 
					threads[15][1] = "Подача подготовленной волокнистой суспензии в напорный ящик машины"; 
					threads[15][2] = true; 
					threads[15][3] = "Orange"; 
	threads[16] = new Array();
					threads[16][0] = 16; 
					threads[16][1] = "Раствор коагулянта"; 
					threads[16][2] = true; 
					threads[16][3] = "Red"; 
	threads[17] = new Array();
					threads[17][0] = 17; 
					threads[17][1] = "Рассол после узла деминерализации"; 
					threads[17][2] = true; 
					threads[17][3] = "Red"; 
	threads[18] = new Array();
					threads[18][0] = 18; 
					threads[18][1] = "Обрывы полотна в сушильной части и на накате"; 
					threads[18][2] = true; 
					threads[18][3] = "Orange"; 
	threads[19] = new Array();
					threads[19][0] = 19; 
					threads[19][1] = "Технологическая вода на разбавление брака"; 
					threads[19][2] = true; 
					threads[19][3] = "Green";
	threads[20] = new Array();
					threads[20][0] = 20; 
					threads[20][1] = "Обрывы и отсечки с сеточного стола"; 
					threads[20][2] = true; 
					threads[20][3] = "Orange"; 
	threads[21] = new Array();
					threads[21][0] = 21; 
					threads[21][1] = "Полимерная упрочняющая добавка"; 
					threads[21][2] = true; 
					threads[21][3] = "Purple"; 
	threads[22] = new Array();
					threads[22][0] = 22; 
					threads[22][1] = "Подача коагулянта"; 
					threads[22][2] = true; 
					threads[22][3] = "Red"; 
	threads[23] = new Array();
					threads[23][0] = 23; 
					threads[23][1] = "Масса в бак постоянного уровня"; 
					threads[23][2] = true; 
					threads[23][3] = "Orange"; 
	threads[24] = new Array();
					threads[24][0] = 24; 
					threads[24][1] = "Волокнистая упрочняющая добавка"; 
					threads[24][2] = true; 
					threads[24][3] = "Purple"; 
	threads[25] = new Array();
					threads[25][0] = 25; 
					threads[25][1] = "Очищенная оборотная вода на деминерализацию"; 
					threads[25][2] = true; 
					threads[25][3] = "Green"; 
	threads[26] = new Array();
					threads[26][0] = 26; 
					threads[26][1] = "Дозированный поток оборотного брака"; 
					threads[26][2] = true; 
					threads[26][3] = "Orange"; 
	threads[27] = new Array();
					threads[27][0] = 27; 
					threads[27][1] = "Основной поток волокнистой суспензии на проточный смеситель"; 
					threads[27][2] = true; 
					threads[27][3] = "Orange"; 
	threads[28] = new Array();
					threads[28][0] = 28; 
					threads[28][1] = "Деминерализованная вода на узел подготовки технологической воды"; 
					threads[28][2] = true; 
					threads[28][3] = "Green"; 
	threads[29] = new Array();
					threads[29][0] = 29; 
					threads[29][1] = "Поток разволокненной суспензии на аккумулирование"; 
					threads[29][2] = true; 
					threads[29][3] = "Orange"; 
	threads[30] = new Array();
					threads[30][0] = 30; 
					threads[30][1] = "Готовая композиция в машинный бассейн"; 
					threads[30][2] = true; 
					threads[30][3] = "Orange"; 
	threads[31] = new Array();
					threads[31][0] = 31; 
					threads[31][1] = "Перелив из бака постоянного уровня"; 
					threads[31][2] = true; 
					threads[31][3] = "Orange"; 
	threads[32] = new Array();
					threads[32][0] = 32; 
					threads[32][1] = "Регистровая вода"; 
					threads[32][2] = true; 
					threads[32][3] = "Green"; 
	threads[33] = new Array();
					threads[33][0] = 33; 
					threads[33][1] = "Промывная вода"; 
					threads[33][2] = true; 
					threads[33][3] = "Green"; 
	threads[34] = new Array();
					threads[34][0] = 34; 
					threads[34][1] = "Отсечки и обрывы на сеточном столе"; 
					threads[34][2] = true; 
					threads[34][3] = "Orange"; 	

	threads[35] = new Array();
					threads[35][0] = 35; 
					threads[35][1] = "Технологическая вода с оптимальным содержанием электролитов"; 
					threads[35][2] = true; 
					threads[35][3] = "Green";

	threads[36] = new Array();
					threads[36][0] = 36; 
					threads[36][1] = "Оборотная вода на узел подготовки технологической воды"; 
					threads[36][2] = true; 
					threads[36][3] = "Green";				
	
	threads[37] = new Array();
					threads[37][0] = 37; 
					threads[37][1] = "Речная вода на узел подготовки технологической воды"; 
					threads[37][2] = true; 
					threads[37][3] = "Green";
	threads[38] = new Array();
					threads[38][0] = 38; 
					threads[38][1] = "На сборник речной воды"; 
					threads[38][2] = true; 
					threads[38][3] = "Green";
					
	threads[39] = new Array();
					threads[39][0] = 39; 
					threads[39][1] = "Поток, обеспечивающий производительность машины"; 
					threads[39][2] = true; 
					threads[39][3] = "Orange";
					
	threads[40] = new Array();
					threads[40][0] = 40; 
					threads[40][1] = "Оборотная вода на вихревые очистители"; 
					threads[40][2] = true; 
					threads[40][3] = "Green";
					
	threads[41] = new Array();
					threads[41][0] = 41; 
					threads[41][1] = "Отходы в отвал"; 
					threads[41][2] = true; 
					threads[41][3] = "Green";
					
	threads[42] = new Array();
					threads[42][0] = 42; 
					threads[42][1] = "Сточная вода"; 
					threads[42][2] = true; 
					threads[42][3] = "Green";
					
					
	var vents = new Array(); // vars for vents	
	vents[1] = new Array();
					vents[1][0] = 1;
					vents[1][1] = "Vent 1"; 
					vents[1][2] = true;
					vents[1][3] = 5;
					
	vents[2] = new Array();
					vents[2][0] = 2;
					vents[2][1] = "Vent 2"; 
					vents[2][2] = true;
					vents[2][3] = 5;
					
	vents[3] = new Array();
					vents[3][0] = 3;
					vents[3][1] = "Vent 3"; 
					vents[3][2] = true;
					vents[3][3] = 5;
					
	vents[4] = new Array();
					vents[4][0] = 4;
					vents[4][1] = "Vent 4"; 
					vents[4][2] = true;
					vents[4][3] = 5;
					
	vents[5] = new Array();
					vents[5][0] = 5;
					vents[5][1] = "Vent 5"; 
					vents[5][2] = true;
					vents[5][3] = 5;
					
	vents[6] = new Array();
					vents[6][0] = 6;
					vents[6][1] = "Vent 6"; 
					vents[6][2] = true;
					vents[6][3] = 5;
					
	vents[7] = new Array();
					vents[7][0] = 7;
					vents[7][1] = "Vent 7"; 
					vents[7][2] = true;
					vents[7][3] = 5;
					
	vents[8] = new Array();
					vents[8][0] = 8;
					vents[8][1] = "Vent 8"; 
					vents[8][2] = true;
					vents[8][3] = 5;
					
	vents[9] = new Array();
					vents[9][0] = 9;
					vents[9][1] = "Vent 9"; 
					vents[9][2] = true;
					vents[9][3] = 5;
					
	vents[10] = new Array();
					vents[10][0] = 10;
					vents[10][1] = "Vent 10"; 
					vents[10][2] = true;
					vents[10][3] = 5;
					
	vents[11] = new Array();
					vents[11][0] = 11;
					vents[11][1] = "Vent 11"; 
					vents[11][2] = true;
					vents[11][3] = 5;
	
	vents[12] = new Array();
					vents[12][0] = 12;
					vents[12][1] = "Vent 12"; 
					vents[12][2] = true;
					vents[12][3] = 5;
					
	
	var sensors = new Array(); // vars for sensors
			
// ======================================================================			
	
	function getPosition(e) {
		var targ;
		if (!e)
			e = window.event;
		if (e.target)
			targ = e.target;
		else if (e.srcElement)
			targ = e.srcElement;
		if (targ.nodeType == 3) 
			targ = targ.parentNode;
		var x = e.pageX - $(targ).offset().left;
		var y = e.pageY - $(targ).offset().top;

		return {"x": x, "y": y};
	}
	
	$(document).click(onMouseClick);	
	//$(document).mousemove(onMouseMove);

	function canvasMouseClick(x,y)
	{
		tooltip.show("");
		tooltip.hide();	
		
		//alert("X:"+x+"Y:"+y);

		for(var i = 1; i < vars.length; i++) // process click event, show tooltips
		{
			
			if(vars[i][3] != null)
			{
				//var xoff = vars[i][3][3] - vars[i][3][1];
				//var off = xoff*0.33;
				//x = Math.floor( x + off );
				
				
				
				if(x >= vars[i][3][0] && x <= vars[i][3][2] && y >= vars[i][3][1] && y <= vars[i][3][3])
				{	
					//alert(vars[i][3][0]+"|"+vars[i][3][2]+"|"+vars[i][3][1]+"|"+vars[i][3][3]);
					tooltip.show(vars[i][1]);				
				}
			}	
		}					
	}
	
	function onMouseClick(event)
	{
		position = getPosition(event); // get coords in canvas
		canvasMouseClick(position.x,position.y);		
	}
	
	function onMouseMove(event)
	{
		position = getPosition(event); // get coords in canvas		
		canvasMouseClick(position.x,position.y);	
	}
	
	function drawRect(id,topLeftCornerX,topLeftCornerY,width,height,tipText,fillColor,borderWidth,borderColor)
	{
			// default values processing
			borderWidth = typeof(borderWidth) != 'undefined' ? borderWidth : '';
			borderColor = typeof(borderColor) != 'undefined' ? borderColor : '';
			
			context.beginPath();			
			context.rect(topLeftCornerX, topLeftCornerY, width, height);
			
			fillColor = typeof(fillColor) != 'undefined' ? fillColor : '#A52A2A';
			tipText = typeof(tipText) != 'undefined' ? tipText : 'Rectangle';
			context.fillStyle = fillColor;
			context.fill();
			
			var bottomRightCornerX = topLeftCornerX + width;
			var bottomRightCornerY = topLeftCornerY + height;
			
			context.lineWidth = borderWidth;
			context.strokeStyle = borderColor;	
			
			context.stroke();
	}
	
	function drawVent(pos,centerX,centerY,fillColor,borderWidth,borderColor)
	{
		context.beginPath();
		
		if(pos == 0) // vertical
		{
			context.moveTo(centerX,centerY);
			context.lineTo(centerX-4,centerY-4);
			context.lineTo(centerX+6,centerY-4);
			context.lineTo(centerX-4,centerY+11);
			context.lineTo(centerX+6,centerY+11);	
			
		} else { // horizontal
			context.moveTo(centerX,centerY);
			context.lineTo(centerX-5,centerY-5);
			context.lineTo(centerX-5,centerY+6);
			context.lineTo(centerX+11,centerY-4);
			context.lineTo(centerX+11,centerY+6);
		}
															
		context.closePath(); // complete custom shape					
		context.fillStyle = fillColor;
		context.fill();					
		context.lineWidth = borderWidth;
		context.strokeStyle = borderColor;
		context.stroke();
	}

	function drawStaticObjects()
	{
		drawRect("1 floor",330,90,280,7); //1st
		drawRect("2 floor",60,370,740,7); //second
		drawRect("3 floor",60,660,920,7); //third			
	}
	
	function drawDynamicObjects()
	{
		for(var i = 1; i < vars.length; i++)
		{			
			switch(i) // draw shapes
			{			
				// ======================== 1ST FLOOR =====================
				
				case 1: 																							
					context.beginPath();
					context.moveTo(70,370);
					context.lineTo(80,350);
					context.lineTo(70,325);
					context.lineTo(80,300);
					context.lineTo(130,300);
					context.lineTo(140,325);
					context.lineTo(130,350);
					context.lineTo(140,370);
															
					context.closePath(); // complete custom shape					
					context.fillStyle = '#4682B4';
					context.fill();					
					context.lineWidth = 2;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					context.beginPath();
					context.moveTo(80,350);
					context.lineTo(130,350);
					context.lineWidth = 2;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					context.beginPath();
					context.moveTo(90,335);
					context.lineTo(120,335);
					context.lineWidth = 5;
					context.strokeStyle = 'black';
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(80,300,140,370);
					
				break;
				
				case 2: 
					
					context.beginPath();
					context.moveTo(180,370);
					context.lineTo(180,340);
					context.lineTo(190,340);
					context.lineTo(190,345);
					context.lineTo(200,345);
					context.lineTo(200,340);
					context.lineTo(230,330);
					context.lineTo(230,355);
					context.lineTo(220,352);
					context.lineTo(220,370);
															
					context.closePath(); // complete custom shape					
					context.fillStyle = '#4682B4';
					context.fill();					
					context.lineWidth = 1;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					
					context.beginPath();
					context.moveTo(200,345);
					context.lineTo(220,352);
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(180,340,220,370);
														
				break;
				
				case 3: 
					
					context.beginPath();
					context.moveTo(250,370);
					context.lineTo(250,340);
					context.lineTo(260,340);
					context.lineTo(260,345);
					context.lineTo(270,345);
					context.lineTo(270,340);
					context.lineTo(300,330);
					context.lineTo(300,355);
					context.lineTo(290,352);
					context.lineTo(290,370);
															
					context.closePath(); 					
					context.fillStyle = '#4682B4';
					context.fill();					
					context.lineWidth = 1;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					context.beginPath();
					context.moveTo(270,345);
					context.lineTo(290,352);
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(250,340,290,370);
					
				break;
				
				case 4:														
					context.beginPath();
					context.moveTo(480,370);
					context.lineTo(480,300);
					context.lineTo(495,300);
					context.lineTo(495,340);
					context.lineTo(515,340);					
					context.closePath(); // complete custom shape	

					context.fillStyle = '#4682B4';
					context.fill();					
					context.lineWidth = 2;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(480,300,515,370);
					
				break;
				
				case 5: 										
					
					context.beginPath();
					context.arc(530, 350, 10, 0, 2 * Math.PI, false);					
					context.fillStyle = "#4682B4";
					context.fill();
					context.lineWidth = 2;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					context.beginPath();
					context.arc(580, 350, 10, 0, 2 * Math.PI, false);
					context.fillStyle = "#4682B4";
					context.fill();
					context.lineWidth = 2;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					context.moveTo(530, 340);
					context.lineTo(580, 340);
					context.strokeStyle = "#708090";
					context.stroke();
					
					context.moveTo(530, 360);
					context.lineTo(580, 360);
					context.strokeStyle = "#708090";
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(520,340,590,360);
					
				break;
				
				case 6:
				
					context.beginPath();
					context.arc(610, 330, 10, 0, 2 * Math.PI, false);					
					context.fillStyle = "#4682B4";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					context.beginPath();
					context.arc(610, 350, 10, 0, 2 * Math.PI, false);
					context.fillStyle = "#4682B4";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(600,320,620,360);
					
				break;
				
				case 7:
					
					context.beginPath();
					context.arc(750, 320, 15, 0, 2 * Math.PI, false);
					context.fillStyle = "#4682B4";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(735,305,765,335);
				
				break;
				
				case 8:
					
					context.beginPath();
					context.arc(680, 310, 30, 0, 2 * Math.PI, false);
					context.fillStyle = "yellow";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "black";
					context.stroke();
					
					context.beginPath();
					context.arc(645, 330, 5, 0, 2 * Math.PI, false);
					context.fillStyle = "yellow";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "black";
					context.stroke();
					
					context.beginPath();
					context.arc(715, 330, 5, 0, 2 * Math.PI, false);
					context.fillStyle = "yellow";
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "black";
					context.stroke();					
										
					context.beginPath();
					var startingAngle = 1.1 * Math.PI;
					var endingAngle = 1.9 * Math.PI;
					var counterclockwise = false; 

					context.beginPath();
					context.moveTo(642,299);
					context.lineTo(630,250);
					context.lineTo(728,250);
					context.lineTo(718,299);
					context.arc(680, 310, 40, startingAngle, endingAngle, counterclockwise);				
					
					context.fillStyle = 'orange';
					context.fill();					
					context.lineWidth = 3;
					context.strokeStyle = 'black';
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(630,250,710,340);
					
				break;
				
				// ======================== TOP FLOOR =====================
					
				case 9:	

					drawRect("5",630,50,100,25,"","#4682B4",2,"#FA8072");
					
					// set coordinates					
					vars[i][3] = new Array(630,50,730,75);
									
				break;

				case 10:				
					
					drawRect("6",630,100,100,25,"","#4682B4",2,"#FA8072");
				
					// set coordinates					
					vars[i][3] = new Array(630,100,730,125);
				break;	

				case 11:				
					
					drawRect("7",630,150,100,25,"","#4682B4",2,"#FA8072");
				
					// set coordinates					
					vars[i][3] = new Array(630,150,730,175);
					
				break;

				case 12:				
					
					for(var k = 0; k < 9; k++)
					{
						var increment = k*30;
						drawRect("8"+k,340+increment,180,15,5,"","Navy",1,"yellow");
					}
									
				break;				
				
				// ======================== BOTTOM FLOOR =====================
				
				case 13:				
					
					context.beginPath();
					context.moveTo(70,660);
					context.lineTo(70,600);
					context.lineTo(130,600);
					context.lineTo(150,630);
					context.lineTo(170,630);
					context.lineTo(170,660);
					
					context.closePath(); // complete custom shape					
					context.fillStyle = 'BurlyWood';
					context.fill();					
					context.lineWidth = 2;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					context.moveTo(170,645);
					context.lineTo(180,645);
					context.stroke();
					
					context.beginPath();
					context.arc(190, 645, 10, 0, 2 * Math.PI, false);
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(70,600,170,660);
					
				break;
				
				case 14:				
					
					drawRect("10",195,400,25,25,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(195,400,220,425);
									
				break;	
				
				case 15:				
					
					drawRect("11",280,400,25,25,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(280,400,305,425);
					
				break;	
				
				case 16:				
					
					drawRect("12",320,400,25,25,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(320,400,345,425);				
				break;	
				
				case 17:				
					
					drawRect("13",220,460,50,90,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(220,460,270,550);
					
					for(var k = 0; k < 4; k++)
					{
						var increment = k*20;
						context.beginPath(); 
						context.arc(236, 475+increment, 5, 0.3 * Math.PI, 1.7 * Math.PI, false);
						context.arc(256, 475+increment, 5, 0.7 * Math.PI, 1.3 * Math.PI, true);
						context.closePath();
						context.fillStyle = 'RosyBrown';
						context.fill();
						context.lineWidth = 1;
						context.strokeStyle = "black"; // line color
						context.stroke();
					}
					
				break;
				
				case 18:				
					
					context.beginPath();
					context.moveTo(280,660);
					context.lineTo(280,600);
					context.lineTo(340,600);
					context.lineTo(360,630);
					context.lineTo(380,630);
					context.lineTo(380,660);
					
					context.closePath(); // complete custom shape					
					context.fillStyle = 'BurlyWood';
					context.fill();					
					context.lineWidth = 2;
					context.strokeStyle = '#FA8072';
					context.stroke();
					
					context.moveTo(380,645);
					context.lineTo(390,645);
					context.stroke();
					
					context.beginPath();
					context.arc(400, 645, 10, 0, 2 * Math.PI, false);
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(280,600,380,660);
									
				break;	
				
				case 19:				
					
					drawRect("15",380,440,40,40,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(380,440,420,480);
					
				break;

				case 20:				
					
					drawRect("16",470,600,90,60,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(470,600,560,660);
					
					context.beginPath();
					context.moveTo(470,645);
					context.lineTo(460,645);
					context.lineWidth = 1;
					context.stroke();
					
					context.beginPath();
					context.arc(450, 645, 10, 0, 2 * Math.PI, false);
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = "#FA8072";
					context.stroke();					
					
					drawRect("16_1",472,620,30,40,"","#DB7093",1,"#DB7093");
					drawRect("16_2",503,630,30,30,"","#7B68EE",1,"#7B68EE");
					drawRect("16_3",530,620,28,40,"","#2E8B57",1,"#2E8B57");
					
					
				break;					
				
				case 21:				
					
					drawRect("17",580,600,50,60,"","#4682B4",1,"#FA8072");
					
					// set coordinates					
					vars[i][3] = new Array(580,600,630,660);
					
					for(var k = 0; k < 3; k++)
					{
						var increment = k*10;
						context.beginPath();
						context.moveTo(590+increment,610);
						context.lineTo(600+increment,610);
						context.lineTo(595+increment,635);
						context.closePath();
						context.fillStyle = 'Red';
						context.fill();
						context.lineWidth = 1;
						context.strokeStyle = "#FA8072"; // line color
						context.stroke();
					}					
				break;
				
				case 22:				
					
					drawRect("18",660,580,50,80,"","#4682B4",1,"#FA8072");
					
					// set coordinates					
					vars[i][3] = new Array(660,580,740,660);
					
					for(var k = 0; k < 4; k++)
					{
						var increment = k*20;
						context.beginPath(); 
						context.arc(670, 590+increment, 5, 0.3 * Math.PI, 1.7 * Math.PI, false);
						context.arc(700, 590+increment, 5, 0.7 * Math.PI, 1.3 * Math.PI, true);
						context.closePath();
						context.fillStyle = 'RosyBrown';
						context.fill();
						context.lineWidth = 1;
						context.strokeStyle = "black"; // line color
						context.stroke();
					}				
				break;
				
				case 23:				
					
					drawRect("19",740,600,50,60,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(740,600,790,660);
									
				break;
				
				case 24:				
					
					drawRect("18",660,450,50,60,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(660,450,710,510);
					
				break;
				
				case 25:
				
					context.beginPath(); 											
					context.arc(810, 450, 30, 1.1*Math.PI, 1.9*Math.PI, true);
					context.lineWidth = 2;
					context.strokeStyle = "#FA8072"; 
					context.fillStyle = '#4682B4';	
					context.closePath();
					context.fill();					
					context.stroke();
					
					// set coordinates					
					vars[i][3] = new Array(780,420,840,480);					
				break;
				
				case 26:
					drawRect("26",880,610,60,50,"","#4682B4",1,"#FA8072");
					// set coordinates					
					vars[i][3] = new Array(880,610,940,660);					
				break;
				
			}
		}
		
		
		for(var i = 1; i < threads.length; i++)
		{			
			switch(i) // draw shapes
			{
			
			case 1:		
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.moveTo(680,50);
						context.lineTo(680,25);	
						context.lineWidth = 4;
						context.strokeStyle = color; // line color						
						context.stroke();										
						
						//draw arrow
						context.beginPath();
						context.moveTo(680,25);
						context.lineTo(675,30);
						context.lineTo(685,30);
						context.closePath();						
						context.stroke();	
						
						//draw number 5
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 693, 39);
						
				break;
				
				case 2:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
				// blue	
						context.beginPath();
						context.moveTo(800,62);
						context.lineTo(730,62);
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(730,62);
						context.lineTo(735,57);
						context.lineTo(735,68);
						context.closePath();	
						context.stroke();

						//draw number 1
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 740, 50);						
				break;
				
				case 3:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					
					context.beginPath();
					context.moveTo(680,100);
					context.lineTo(680,75);
					context.lineWidth = 4;
					context.strokeStyle = color; 
					context.stroke();
					
					//draw arrow
						context.beginPath();
						context.moveTo(680,75);
						context.lineTo(675,80);
						context.lineTo(685,80);
						context.closePath();						
						context.stroke();	
						
						//draw number 5
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 693, 89);
					
				break;
				
				case 5:				
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(500,210);
						context.lineTo(780,210);
						context.lineTo(780,110);
						context.lineTo(730,110);
						context.stroke();												
						
						//draw arrow
						context.beginPath();
						context.moveTo(730,110);
						context.lineTo(735,115);
						context.lineTo(735,105);
						context.closePath();
						context.stroke();
						
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 740, 100);
						
						
				break;

				case 6:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					
					context.beginPath();
					context.strokeStyle = color;
					context.moveTo(680,150);
					context.lineTo(680,125);
					context.lineWidth = 4;										
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(680,125);
					context.lineTo(675,130);
					context.lineTo(685,130);
					context.closePath();						
					context.stroke();	
						
					//draw number 5
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 693, 139);
					
				break;				
				
				case 7:
				
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(340,160);
						context.lineTo(629,160);	
						context.stroke();

						//draw arrow
						context.beginPath();
						context.moveTo(629,160);
						context.lineTo(624,155);
						context.lineTo(624,165);
						context.closePath();
						context.stroke();
						
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 610, 150);												
				break;
				
				case 4:					
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color						
						
						context.moveTo(629,110);
						context.lineTo(340,110);
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(340,110);
						context.lineTo(345,105);
						context.lineTo(345,115);
						context.closePath();
						context.stroke();
						
						//draw number 3
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 350, 125);
						
				break;	
				
				case 8:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					
					context.beginPath();
					context.strokeStyle = color; 					
					context.moveTo(680,249);
					context.lineTo(680,175);
					context.lineWidth = 4;					
					context.stroke();
					
					//draw arrow
						context.beginPath();
						context.moveTo(680,175);
						context.lineTo(675,180);
						context.lineTo(685,180);
						context.closePath();						
						context.stroke();	
						
						//draw number 5
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 693, 189);
					
				break;
				
				case 9:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(629,62);
						context.lineTo(300,62);
						context.lineTo(300,210);
						context.lineTo(400,210);
						context.stroke();

						//draw arrow
						context.beginPath();
						context.moveTo(400,210);
						context.lineTo(395,205);
						context.lineTo(395,215);
						context.closePath();						
						context.stroke();
						
						//draw number 2
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 380, 230);
				
				break;	
							
				
				case 10:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						context.moveTo(730,160);
						context.lineTo(750,160);
						context.lineTo(750,280);
						context.lineTo(723,280);
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(723,280);
						context.lineTo(728,275);
						context.lineTo(728,285);						
						context.closePath();
						context.stroke();
												
						//draw number 4
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 730, 268);
						
						
				break;	
				
				case 11:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}				
					context.beginPath();
					
					context.moveTo(100,300);
					context.lineTo(100,270);
					context.lineTo(20,270);
					context.lineTo(20,720);
					context.lineTo(900,720);
					context.lineTo(900,660);
					context.lineWidth = 4;
					context.strokeStyle = color; // line color					
					context.stroke();

					//draw arrow
					context.beginPath();
					context.moveTo(100,300);
					context.lineTo(95,295);
					context.lineTo(105,295);
					context.closePath();
					context.stroke();					
					
					//draw number 13
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 75, 290);	
					
				break;
				
				case 12:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
				
						context.beginPath();			    
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(120,200);
						context.lineTo(120,300);																			
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(120,300);
						context.lineTo(115,295);
						context.lineTo(125,295);
						context.closePath();						
						context.stroke();	

						//draw number 20
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 130, 290);
				
				break;
				
				case 13:	

						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.beginPath();				
						context.moveTo(770,660);
						context.lineTo(770,690);
						context.lineTo(950,690);
						context.lineTo(950,240);
						context.lineTo(545,240);
						context.lineTo(545,335);						
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(545,335);
						context.lineTo(540,330);
						context.lineTo(550,330);
						context.closePath();						
						context.stroke();	
						
						//draw number 14
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 555, 330);	
				break;
				
				case 14: // pink										
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = "DeepPink"; // line color
						
						context.beginPath();				
						context.moveTo(520,339);
						context.lineTo(660,339);						
						context.stroke();						
						context.beginPath();
						context.arc(680, 310, 34, 0.7 * Math.PI, 2.3 * Math.PI, false);						
						context.moveTo(700,336);
						context.lineTo(756,336);						
						context.stroke();
						
						//draw number 14
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 720, 355);	
						
				break;
				
				
								
				case 15:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(440,645);
					context.lineTo(430,645);
					context.lineTo(430,550);
					context.lineTo(480,550);
					context.lineTo(480,375);					
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(480,375);
					context.lineTo(475,380);
					context.lineTo(485,380);
					context.closePath();						
					context.stroke();
					
					//draw number 27
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 455, 395);
				
				break;
				
				case 16:	// yellow
				
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.beginPath();
						context.moveTo(205,375);
						context.lineTo(205,400);						
						context.stroke();
												
						//draw arrow
						context.beginPath();
						context.moveTo(205,400);
						context.lineTo(200,395);
						context.lineTo(210,395);
						context.closePath();
						context.stroke();

						//draw number 15
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 181, 390);	
						
				break;

				
				
				case 17:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(712,480);
						context.lineTo(740,480);
						context.lineTo(740,580);
						context.lineTo(820,580);
						context.lineTo(820,710);
						context.lineTo(30,710);
						context.lineTo(30,415);
						context.lineTo(195,415);
						context.stroke();	
						
						//draw arrow
						context.beginPath();
						context.moveTo(195,415);
						context.lineTo(190,410);
						context.lineTo(190,420);
						context.closePath();												
						context.stroke();	
						
						//draw number 17
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 165, 435);
									
													
				break;
				
				case 18:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(630,395);
					context.lineTo(785,395);
					context.lineTo(785,440);
					context.stroke();
					
					context.moveTo(632,340);
					context.lineTo(632,395);
					context.stroke();
					
					context.moveTo(710,337);
					context.lineTo(710,395);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(785,440);
					context.lineTo(780,435);
					context.lineTo(790,435);
					context.closePath();						
					context.stroke();
					
					//draw number 31
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 760, 430);
					
				break;
				
					case 19:
					
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					context.moveTo(920,610);
					context.lineTo(920,390);
					context.lineTo(810,390);					
					context.lineTo(810,440);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(810,440);
					context.lineTo(805,435);
					context.lineTo(815,435);
					context.closePath();
					context.stroke();
					
					//draw number 12
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 790, 430);
									
				break;
				
				case 20:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(545,660);
					context.lineTo(545,760);
					context.lineTo(860,760);
					context.lineTo(860,410);
					context.lineTo(830,410);
					context.lineTo(830,440);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(830,440);
					context.lineTo(825,435);
					context.lineTo(835,435);
					context.closePath();						
					context.stroke();
					
					//draw number 30
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 835, 430);
				
				break;
				
				case 21:	// purple

						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
					
						context.beginPath();
						context.moveTo(292,375);
						context.lineTo(292,400);																			
						
						context.moveTo(292,423);
						context.lineTo(292,470);
						context.lineTo(270,470);
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(270,470);
						context.lineTo(275,465);
						context.lineTo(275,475);
						context.closePath();																	
						context.stroke();
						
						//draw number 18
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 280, 485);
						
				break;
				
				
				case 22:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(205,425);
						context.lineTo(205,480);
						context.lineTo(219,480);
						
						//draw arrow
						context.stroke();						
						context.beginPath();
						context.moveTo(219,480);
						context.lineTo(214,475);
						context.lineTo(214,485);
						context.closePath();
						context.stroke();
						
						//draw number 16
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 183, 478);	
						
				break;
				
				
				case 23:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(400,637);
					context.lineTo(400,480);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(400,480);
					context.lineTo(395,485);
					context.lineTo(405,485);
					context.closePath();						
					context.stroke();
					
					//draw number 24
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 405, 500);	
				
				break;
				
				
				case 24:
						var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
						context.beginPath();
						context.lineWidth = 4;
						context.strokeStyle = color; // line color
						
						context.moveTo(330,375);
						context.lineTo(330,400);													
						
						context.moveTo(330,423);
						context.lineTo(330,500);
						context.lineTo(270,500);
						context.stroke();
						
						//draw arrow
						context.beginPath();
						context.moveTo(270,500);
						context.lineTo(275,495);
						context.lineTo(275,505);
						context.closePath();						
						context.stroke();	

						//draw number 19
						context.font = "12pt Calibri";
						context.lineWidth = 1;
						context.strokeStyle = "white"; // stroke color
						context.strokeText(i, 280, 515);		
				break;
				
				case 25:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
				
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(605,600);
					context.lineTo(605,500);
					context.lineTo(660,500);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(660,500);
					context.lineTo(655,495);
					context.lineTo(655,505);
					context.closePath();
					context.stroke();
					
					//draw number 8
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 635, 515);
					
				break;
				
				case 26:
					
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(840,460);
					context.lineTo(840,735);
					context.lineTo(10,735);
					context.lineTo(10,510);
					context.lineTo(220,510);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(220,510);
					context.lineTo(215,505);
					context.lineTo(215,515);
					context.closePath();						
					context.stroke();
					
					//draw number 29
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 195, 525);
				
				break;
				
				case 27:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
				
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(190,635);
					context.lineTo(190,530);																			
					context.lineTo(160,530);
					context.lineTo(160,280);
					context.lineTo(370,280);
					context.lineTo(370,570);
					context.lineTo(250,570);
					context.lineTo(250,550);

					context.moveTo(160,300);
					context.lineTo(370,300);

					context.moveTo(205,280);
					context.lineTo(205,340);

					context.moveTo(215,280);
					context.lineTo(215,336);

					context.moveTo(275,280);
					context.lineTo(275,340);

					context.moveTo(285,280);
					context.lineTo(285,336);					
					context.stroke();
					
									
					//draw arrow
					context.beginPath();
					context.moveTo(250,550);
					context.lineTo(245,555);
					context.lineTo(255,555);
					context.closePath();						
					context.stroke();	

					
					//draw number 22
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 220, 570);
				
				break;
				
				case 28:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					context.moveTo(685,510);
					context.lineTo(685,580);					
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(685,580);
					context.lineTo(680,575);
					context.lineTo(690,575);
					context.closePath();
					context.stroke();
					
					//draw number 10
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 660, 570);
					
				break;
				
				case 29:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(110,370);
					context.lineTo(110,600);																			
					context.stroke();

						//draw arrow
						context.beginPath();
						context.moveTo(110,600);
						context.lineTo(105,595);
						context.lineTo(115,595);
						context.closePath();						
						context.stroke();	

						//draw number 21
						 context.font = "12pt Calibri";
						 context.lineWidth = 1;
						 context.strokeStyle = "white"; // stroke color
						 context.strokeText(i, 122, 590);					
				
				break;
				
				
				
				case 30:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(250,460);
					context.lineTo(250,440);
					context.lineTo(312,440);
					context.lineTo(312,600);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(312,600);
					context.lineTo(307,595);
					context.lineTo(317,595);
					context.closePath();						
					context.stroke();					


					//draw number 23
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 290, 590);				
				
				break;
				
				case 31:
					
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(380,460);
					context.lineTo(350,460);
					context.lineTo(350,550);
					context.lineTo(330,550);
					context.lineTo(330,600);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(330,600);
					context.lineTo(325,595);
					context.lineTo(335,595);
					context.closePath();						
					context.stroke();
					
					//draw number 25
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 340, 590);
				
				break;
				
				case 32:
				
				 // green	
					
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color;					
					
					context.moveTo(535,360);
					context.lineTo(535,450);
					context.lineTo(500,450);
					context.lineTo(500,600);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(500,600);
					context.lineTo(495,595);
					context.lineTo(505,595);
					context.closePath();
					context.stroke();
					
					//draw number 6
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 480, 590);
						
				break;
				
				case 33:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					context.moveTo(555,360);
					context.lineTo(555,470);
					context.lineTo(525,470);
					context.lineTo(525,600);
					context.stroke();		

					//draw arrow
					context.beginPath();
					context.moveTo(525,600);
					context.lineTo(520,595);
					context.lineTo(530,595);
					context.closePath();					
					context.stroke();
					
					//draw number 7
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 505, 590);
					
				break;
				
				case 34:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(580,360);
					context.lineTo(580,500);
					context.lineTo(550,500);
					context.lineTo(550,600);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(550,600);
					context.lineTo(545,595);
					context.lineTo(555,595);
					context.closePath();						
					context.stroke();
					
					//draw number 28
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 530, 590);
				
				break;
				
				case 35:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(700,580);
					context.lineTo(700,560);					
					context.lineTo(900,560);
					context.lineTo(900,610);
					context.stroke();
										
					//draw arrow
					context.beginPath();
					context.moveTo(900,610);
					context.lineTo(895,605);
					context.lineTo(905,605);
					context.closePath();
					context.stroke();
					
					//draw number 11
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 880, 600);
					
				break;
				
				case 36:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(630,630);
					context.lineTo(660,630);										
					context.stroke();					
										
					//draw arrow
					context.beginPath();
					context.moveTo(660,630);
					context.lineTo(655,625);
					context.lineTo(655,635);
					context.closePath();
					context.stroke();
					
					//draw number 13
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 640, 620);
				
				break;
				
				case 37:
				var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
				
					context.moveTo(740,630);
					context.lineTo(710,630);										
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(710,630);
					context.lineTo(715,625);
					context.lineTo(715,635);
					context.closePath();
					context.stroke();
					
					//draw number 14
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 715, 620);
				
				break;
				
				
				case 38:
				var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					context.moveTo(1040,500);
					context.lineTo(850,500);
					context.lineTo(850,630);
					context.lineTo(790,630);										
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(790,630);
					context.lineTo(795,625);
					context.lineTo(795,635);
					context.closePath();
					context.stroke();
					
					//draw number 12
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 796, 620);
					
				break;
				
				case 39:
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
						
					context.moveTo(420,460);
					context.lineTo(463,460);
					context.lineTo(463,645);					
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(463,645);
					context.lineTo(460,637);
					context.lineTo(466,637);
					context.closePath();						
					context.stroke();
					
					//draw number 26
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 440, 631);
				
				break;
				
				
				case 40:
				var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(515,660);
					context.lineTo(515,680);
					context.lineTo(605,680);
					context.lineTo(605,660);
					context.stroke();
					
					//draw arrow
					context.beginPath();
					context.moveTo(605,665);
					context.lineTo(600,670);
					context.lineTo(610,670);
					context.closePath();
					context.stroke();
					
					//draw number 9
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 616, 680);
					
				break;
				
				case 41:
				var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(580,650);
					context.lineTo(570,650);
					context.lineTo(570,700);
					context.stroke();

					//draw arrow
					context.beginPath();
					context.moveTo(570,700);
					context.lineTo(565,695);
					context.lineTo(575,695);
					context.closePath();
					context.stroke();					
					
					//draw number 13
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 582, 697);	
					
				break;
				
				case 42:
				
					var color = threads[i][3];											
						if(!threads[i][2])
						{
							color = "Gray";
						}
						
					context.beginPath();
					context.lineWidth = 4;
					context.strokeStyle = color; // line color
					
					context.moveTo(630,650);
					context.lineTo(650,650);
					context.lineTo(650,700);
					context.stroke();

					//draw arrow
					context.beginPath();
					context.moveTo(650,700);
					context.lineTo(645,695);
					context.lineTo(655,695);
					context.closePath();
					context.stroke();					
					
					//draw number 13
					context.font = "12pt Calibri";
					context.lineWidth = 1;
					context.strokeStyle = "white"; // stroke color
					context.strokeText(i, 655, 690);	
					
				break;
								
			}
		}
		
		var scaleX1 = 0;
		var dif = 1-scaleVar;
		switch(dif)
		{
			case 0: break;
			case 0.1: scaleX1 = 0.1*100; break;
			case 0.2: scaleX1 = 0.1*200; break;
			case 0.3: scaleX1 = 0.1*300; break;
		}
		
		for(var i = 1; i < vents.length; i++)
			{			
				switch(i) // draw shapes
				{					
					case 1:							
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,119,220,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(119,222);
						context.lineTo(50,222);
						context.lineTo(50,5);
						context.stroke();
					break;
					
					case 2:		
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(1,175,508,"blue",3,"red");						
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(177,508);
						context.lineTo(177,490);
						context.lineTo(150,490);
						context.lineTo(150,5);
						context.stroke();
					
					break;
					
					case 3:
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,291,385,"blue",3,"red");	
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(291,387);
						context.lineTo(240,387);
						context.lineTo(240,5);
						context.stroke();
					break;
					
					case 4:
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,329,385,"blue",3,"red");	
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(329,387);
						context.lineTo(315,387);
						context.lineTo(315,260);
						context.lineTo(280,260);
						context.lineTo(280,40);
						context.lineTo(340,40);
						context.lineTo(340,5);
						context.stroke();						
					break;
					
					case 5:	
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,369,330,"blue",3,"red");	
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(369,332);
						context.lineTo(428,332);
						context.lineTo(428,5);
						context.stroke();
					break;
					
					case 6:	
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,462,580,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(462,582);
						context.lineTo(450,582);
						context.lineTo(450,40);
						context.lineTo(520,40);
						context.lineTo(520,5);
						context.stroke();
					break;
					
					case 7:
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,544,300,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(544,302);
						context.lineTo(573,302);
						context.lineTo(573,40);
						context.lineTo(620,40);
						context.lineTo(620,5);
						context.stroke();
					break;
					break;
					
					case 8:
						//var y = i*9;
						//var off = scaleX1+y;
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(580,350);
						context.lineTo(580,45);
						context.lineTo(580,45);
						context.lineTo(715,45);
						context.lineTo(715,5);
						context.stroke();							
					break;
					
					case 9:
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(1,780,60,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(782,60);
						context.lineTo(782,40);						
						context.lineTo(810,40);
						context.lineTo(810,5);
						context.stroke();
					break;
					
					case 10:
						//var y = i*9;
						//var off = scaleX1+y;
						drawVent(0,779,140,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(779,142);
						context.lineTo(905,142);						
						context.lineTo(905,5);
						context.stroke();
					break;
					
					case 11:
						//var y = i*9;
						//var off = scaleX1+y;					
						drawVent(0,749,180,"blue",3,"red");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "White"; // line color						
						context.moveTo(749,182);
						context.lineTo(1000,182);						
						context.lineTo(1000,5);
						context.stroke();
					break;				
				
				}
			}
		
	}
	
	function drawGauges()
	{
	
		for(var i = 1; i < R.length; i++)
		{
			options = {
					value: R[i][1],
					label: R[i][0],
					min: R[i][3],
					max: R[i][4],
					majorTicks: 10,
					minorTicks: 5
				};
			R[i][2] = new Gauge( document.getElementById('r'+i), options );
		}
		
	}		
	
	function getMoreOrLessColor(color,level)
	{
		var c;
		if(level) // level = true, more intensive
		{
			switch(color)
			{
				case 'Green':
					c = '#004F00';
				break;
				case 'Blue':
					c = '#00008B';
				break;
				case 'Orange':
					c = '#EE4000';
				break;
				case 'Red':
					c = '#8B0000';
				break;
				case 'Purple':
					c = '#68228B';
				break;
			}			
		} else // less intensive
		{
			switch(color)
			{
				case 'Green':
					c = '#7BBF6A';
				break;
				case 'Blue':
					c = '#5190ED';
				break;
				case 'Orange':
					c = '#FF9955';
				break;
				case 'Red':
					c = '#EE6363';
				break;
				case 'Purple':
					c = '#BF5FFF';
				break;
			}			
		}
		return c;
	}
	
	function isInt(n) 
	{
		return n % 1 == 0;
	}
	
	function randomNormal() 
	{
		return Math.cos(2 * Math.PI * Math.random()) * Math.sqrt(-2 * Math.log(Math.random()));
	}
	
	function getRandomBetween(left,right)
	{
		// if(inte)
		// {
			// return Math.floor(left + (1+right-left)*Math.random());
		// }
		// else {
			return left + (right-left)*Math.random();
		// }		
	}
	
	function getHarmonicValue(left,right,current,i)
	{
		var r;		
		var dir = U[i][5]; // 1 - up, 0 - down
		current = parseFloat(current);
				
	
		if(current >= right)
		{
			dir = 0;
			U[i][5] = 0;
		}
		
		if(current <= left)
		{
			dir = 1;
			U[i][5] = 1;
		}
		
		var incr;
		
		if(isInt(left))
		{
			incr = 0.7;
		} else
		{
			incr = 0.05;
		}
		
		if(i == 12)
		{
			incr = 0.01;
		}
		
		switch(dir)
		{
			case 1:
				r = current + incr;
			break;
			
			case 0:
				r = current - incr;
			break;
		}					
			return parseFloat(r.toFixed(2));	
	}	
	
	function showNumbers()
	{
		if(!stopNumbers)
		{
			for(var i = 1; i < U.length; i++)
			{		
				//var s = getRandomBetween(U[i][1],U[i][3]).toFixed(2);
				var s = getHarmonicValue(U[i][1],U[i][3],U[i][4],i);			
				U[i][4] = s; // set current value			
				$("#U"+i).val(s.toString());
				
				// ===== convert to 155px length =======
				var d = U[i][3] - U[i][1];
				var dx = s - U[i][1];
				var pro = dx / d;						
				var pixels = 155 * pro;
				// =====================================
				
				if(i == 12)
				{
					var c;
				}
				
				$("#ubar"+i).css("width",pixels.toString()+"px");
			}
			
			for(var i = 1; i < R.length; i++)
			{
				$("#RC"+i).val(R[i][1]);
				
				/*
				if(R[i][6])
				{
					$("#RC"+i).css('background-color','orange');
				}
					else
				{
					$("#RC"+i).css('background-color','white');
				}
				*/
			}
		}
	}
	
		
	// ==================== events ================================
	
	$('.plus').click(function() 
		{ 
			var ind = parseInt($(this).attr('id').replace('add',''));			
			if(ind == 6) // это дробное
			{
				var x = R[ind][1]+0.1;
				if(x <= R[ind][4])
				{
					R[ind][1] = R[ind][1]+0.1;			
					R[ind][2].setValue(R[ind][1]);
					$('#RC'+ind).val(R[ind][1].toFixed(1));
				}
			}
			else
			{
				var x = R[ind][1]+5;
				if(x <= R[ind][4])
				{
					R[ind][1] = R[ind][1]+5;			
					R[ind][2].setValue(R[ind][1]);
					$('#RC'+ind).val(R[ind][1]);
				}
			}
		} 
	);
	
	$('.minus').click(function() 
		{ 			
			var ind = parseInt($(this).attr('id').replace('minus',''));	
			if(ind == 6) // это дробное
			{
				var x = R[ind][1]-0.1;			
				if(x >= R[ind][3])
				{
					R[ind][1] = R[ind][1]-0.1;
					R[ind][2].setValue(R[ind][1]);
					$('#RC'+ind).val(R[ind][1].toFixed(1));
				}				
			}
			else
			{
				var x = R[ind][1]-5;			
				if(x >= R[ind][3])
				{
					R[ind][1] = R[ind][1]-5;
					R[ind][2].setValue(R[ind][1]);
					$('#RC'+ind).val(R[ind][1]);
				}
			}
		} 
	);
		
	$('.r').bind('keyup', function() // gauges set data
		{ 
			var ind = $(this).attr('id');			
			ind = parseInt(ind.replace("RC",""));
			R[ind][1] = parseInt($(this).val());
			R[ind][2].setValue(parseInt($(this).val()));
		} 
	);
	
	function start()
	{
		time = setInterval(process,500);
		launch = true;
		stopNumbers = false;
		$('#status').html('<font color="red">=== <strong>Технологический процесс запущен ('+mode+')</strong> ===</font>');
	}
	
	function slow()
	{
		clearInterval(time);
		time = setInterval(process,2000);
	}
	
	function stop()
	{

		$('#status').html('<font color="black">=== <strong>Технологический процесс остановлен ('+mode+')</strong> ===</font>');
		
		for(var i = 1; i < threads.length; i++) // reset colors
		{
			threads[i][2] = true;
		}
		
		for(var i = 1; i < Stimes.length; i++)
		{
			Stimes[i] = null;
		}
		
		for(var i = 1; i < R.length; i++) // reset gauges to default
		{
			R[i][1] = R[i][5];
			R[i][2].setValue(R[i][5]);
		}
		
		for(var i = 1; i < U.length; i++) // reset 
		{
			showNumbers(); // get random one time
		}
		
		for(var i = 1; i < S.length; i++) // reset situations
		{
			S[i][1] = false;
		}
		
		clearInterval(time);
		launch = false;	
		stopNumbers	= false;
		twoSec = 0;
		
		process(); // refresh window one time
	}		

	function updateGauges()
	{
		for(var i = 1; i < R.length; i++) // update gauges
		{
			if(R[i][2].getValue() != R[i][5])
			{		
				R[i][2].setFillColor(['#FFFF54']);
			}
			else
			{
				R[i][2].setFillColor([ '#111', '#ccc', '#ddd', '#eee' ]);	
			}

			R[i][2].setValue(R[i][1]);			
		}
	}
	
	function sleep(millis)
	{
		var date = new Date();
		var curDate = null;
		do { curDate = new Date(); }
		  while(curDate-date < millis);
	}
	
	function optionsSys()
	{

		var b = 'Максимальное количество одновременных ситуаций: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="maxS" value="'+maxLaunchedSituations+'" type="text" style="width:20px;" /><br/><br/>';
		b += 'Минимальное время между авариями в автоматическом режиме, c: <input id="delay1" value="'+ delay_between_disaster/1000 +'" type="text" style="width:20px;" /><br/><br/>';
		
		var dd = $('<div></div>').html(b).dialog({
				autoOpen: false,
				resizable: false,
				width: 530,
				title: 'Настройки',
				close: function(event, ui) { }
			});
			
		dd.dialog( "option", "buttons", { "OK": function() { 
				if(parseInt($("#maxS").val()) > 4)
				{
					alert('Максимум 4 одновременных ситуации!');
				} else
				{
					maxLaunchedSituations = $("#maxS").val();
					var x = parseInt($("#delay1").val()); 
					delay_between_disaster = x*1000;
					$(this).dialog("close");	
				}				 			
			} 
		} );
		
		dd.dialog('open');
	}

	
	function eventManager(index)
	{
		switch(index)
		{
			case 1:
				S[index][1] = true;				
			break;
			case 2:
				S[index][1] = true;
			break;
			case 3:
				S[index][1] = true;
			break;
			case 4:
				S[index][1] = true;
			break;
			case 5:
				S[index][1] = true;
			break;
			case 6:
				S[index][1] = true;
			break;
			case 7:
				S[index][1] = true;
			break;
			case 8:
				S[index][1] = true;
			break;
			case 9:
				S[index][1] = true;
			break;
			case 10:
				start();
			break;
			case 11:
				stop();
			break;
			case 12:
				threadsInfo();
			break;
			case 13:
				programInfo();
			break;
			case 14:
				document.location.reload();
			break;
			case 15:
				mode = 'Ручное управление';
			break;
			case 16:
				mode = 'Авто';
			break;
			case 17:
				optionsSys();
			break;
			case 18:
				faqInfo();
			break;
		}
	}	
	
	function faqInfo()
	{
	
		var txt = 'После запуска тренажера его главное окно выглядит следующим образом:<br/>';
		txt += '<img width="640" height="480" src="3.jpg" alt="Главное окно тренажера" /><br/><br/>';
		txt += 'Для того чтобы приступить к работе необходимо установить нужные настройки (если требуется) в окне настроек программы:<br/>'; 
		txt += '<img src="4.jpg" alt="Главное окно тренажера" /><br/><br/>';
		txt += 'Далее следует выбрать режим работы:<br/>'; 
		txt += '<img src="5.jpg" alt="Главное окно тренажера" /><br/><br/>';
		txt += 'Для запуска технологического процесса нажмите кнопку «Пуск»:<br/>'; 
		txt += '<img src="6.jpg" alt="Главное окно тренажера" /><br/><br/>';
		txt += 'Если вы выбрали ручной режим, то для запуска аварийной ситуации вам необходимо выбрать ее в выпадающем меню:<br/>'; 
		txt += '<img src="7.jpg" alt="Главное окно тренажера" /><br/><br/>';
		txt += 'Если вы выбрали автоматический режим, то в зависимости от текущих внешних факторов будут запускаться соответствующие аварийные ситуации, при этом их пути их разрешения будут отображаться в информационных окнах:<br/>'; 
		txt += '<img width="640" height="480" src="8.jpg" alt="Главное окно тренажера" />';
	
		var $dialog = $('<div></div>').html(txt).dialog({
				autoOpen: true,
				resizable: false,
				width: 800,
				height: 700,
				title: 'Инструкция пользователя',
				close: function(event, ui) { }
			});
	}
	
	function programInfo()
	{
		programInfoShow = true;
		
		var $dialog = $('<div style="text-align":left;"></div>').html('Компьютерный тренажер по предотвращению и ликвидации аварий в технологическом процессе производства печатных видов бумаги.').dialog({
				autoOpen: true,
				resizable: false,
				width: 300,
				title: 'О программе',
				close: function(event, ui) { programInfoShow = false;}
			});
	}
	
	function threadsInfo()
	{
		var body;
		threadsInfoShow = true;
		
		 body = '<table border="1" cellspacing="5" cellpading="5">';
		 for(var i = 1; i < threads.length; i++)
		 {
			 body += '<tr>';
				body += '<td>&nbsp;<strong>' + i.toString() + '</strong>&nbsp;</td>';
				body += '<td align="left">&nbsp;' + threads[i][1] + '&nbsp;</td>';
			 body += '</tr>';
		 }		
		
		body += '</table>';
		
		var $dialog = $('<div style="text-align":left;"></div>').html(body).dialog({
				autoOpen: true,
				height: 580,
				resizable: true,
				width: 600,
				title: 'Информация о потоках',
				close: function(event, ui) { threadsInfoShow = false;}
			});			
	}
	
	function ConcurrentCheck(j)
	{
		for(var i = 1; i < S.length; i++)
		{
			if(S[i][1])
			{
				if(jQuery.inArray(j, S[i][5]) != -1)
				{
					return false;
				} 
			}
		}
		return true;
	}
	
	function twoSecDelay()
	{
			var d = new Date();
			var now = d.getTime();
			var diff = now - twoSec;
			
			if(diff > 3000)
			{
				return true;
			} else
			{
				return false;
			}
	}
	
	function conditionsListener() // check conds and automatically modeling situations
	{
		var timerPermit = true;
		
		if(delayTimer1 != null)
		{
			var d = new Date();
			var now = d.getTime();
			var diff = now - delayTimer1;
			
			if(diff < delay_between_disaster)
			{
				timerPermit = false;
			}
		}
		
		if(mode == "Авто" && timerPermit)
		{
			for(var i = 1; i < U.length; i++)
			{						
				switch(i)
				{
					case 1:
						if(U[i][4] > 25)
						{
							if(!S[8][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay()) // если ситуация не запущена
							{
								var d = new Date();
								twoSec = d.getTime();
								
								S[8][1] = true; // запустить
								$("#U4").css("background-color","orange");
							}
						}
						if(U[i][4] < -10)
						{
							if(!S[7][1]  && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[7][1] = true;
								$("#U1").css("background-color","orange");
							}
						}
					break;
					case 2:
					
					break;
					case 3:
						if(U[i][4] < 25)
						{
							if(!S[2][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[2][1] = true;
								$("#U3").css("background-color","orange");
							}
						}					
					break;
					case 4:
						if(U[i][4] > 140)
						{
							if(!S[1][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[1][1] = true;
								$("#U4").css("background-color","orange");
							}
						}					
					break;
					case 5:
						if(U[i][4] < 10)
						{
							if(!S[6][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[6][1] = true;
								$("#U5").css("background-color","orange");
							}
						}	
						if(U[i][4] > 20)
						{
							if(!S[9][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[9][1] = true;
								$("#U5").css("background-color","orange");
							}
						}	
					break;
					case 6:
						if(U[i][4] < 5)
						{
							if(!S[4][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[4][1] = true;
								$("#U6").css("background-color","orange");
							}
						}
						if(U[i][4] > 8)
						{
							if(!S[5][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[5][1] = true;
								$("#U6").css("background-color","orange");
							}
						}							
					break;
					case 7:
						if(U[i][4] > 0.85)
						{
							if(!S[3][1] && checkLaunchMoreSituations() && ConcurrentCheck(i) && twoSecDelay())
							{
								var d = new Date();
								twoSec = d.getTime();
							
								S[3][1] = true;
								$("#U7").css("background-color","orange");
							}
						}
					break;
					case 8:
					
					break;
					case 9:
					
					break;
					case 10:
					
					break;
					case 11:
					
					break;
					case 12:
					
					break;
				}
			}
		}
	}
	
	function situationExpired(i,millis)
	{
		if(Stimes[i] == null)
		{								
			var d = new Date();
			Stimes[i] = d.getTime();
			return false;
		} else // check how many time elapsed								
			{
				var d = new Date();
				var now = d.getTime();
				var diff = now - Stimes[i]; 
				if(diff > millis){return true;}									
			}		
	}
	
	function resetConditions()
	{
		
		if(mode == 'Авто')
		{
			var d = new Date();
			delayTimer1 = d.getTime();
		}
		
		for(var i = 1; i < U.length; i++) // reset 
		{
			showNumbers(); // get random one time
			$("#U"+i).css("background-color","white");
		}		
		
		stopNumbers = false;	
		process(); // refresh window one time
	}
	
	function processSituations()
	{
		if(launch)
		{
			for(var i = 1; i < S.length; i++)
			{
				switch(i)
				{
					case 1:						
						if(S[i][1])
							{	
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								//stopNumbers = true;	

								fireImage = new Image();
								fireImage.src = 'images/Fire_Icon.png';
								context.drawImage(fireImage, 600, 190, 70, 105);
								
								if(threads[1][2] == false)
								{
									threads[1][2] = true; 
									threads[1][3] = "Blue";
									
									threads[2][2] = true;
									threads[2][3] = "Blue";
									
									threads[3][2] = true;
									threads[3][3] = "Blue";
									
									threads[5][2] = true;
									threads[5][3] = "Blue";
									
									threads[6][2] = true;
									threads[6][3] = "Blue";
									
									threads[7][2] = true;
									threads[7][3] = "Blue";
									
									threads[8][2] = true;
									threads[8][3] = "Blue";
									
									threads[9][2] = true;
									threads[9][3] = "Blue";
									
									threads[10][2] = true;
									threads[10][3] = "Blue";
									
								} else
								{
									threads[1][2] = false; 
									threads[2][2] = false;
									threads[3][2] = false;
									threads[5][2] = false;
									threads[6][2] = false;
									threads[7][2] = false;
									threads[8][2] = false;
									threads[9][2] = false;
									threads[10][2] = false;
								}
								
								if(S[i][4] == null)
								{
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								if(situationExpired(i,10000))
								{								
									S[i][1] = false;
									resetConditions();
									
									threads[1][2] = true; 
									threads[2][2] = true;
									threads[3][2] = true;
									threads[5][2] = true;
									threads[6][2] = true;
									threads[7][2] = true;
									threads[8][2] = true;
									threads[9][2] = true;
									threads[10][2] = true;
									
									Stimes[i] = null;
									
								}
							} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
					case 2:
						if(S[i][1])
						{	
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								if(threads[2][3] == "Blue")
								{
									threads[2][3] = getMoreOrLessColor(threads[2][3],true);
								} else
									{
										threads[2][3] = "Blue";
									}
									
								if(threads[5][3] == "Blue")
								{
									threads[5][3] = getMoreOrLessColor(threads[5][3],true);
								} else
									{
										threads[5][3] = "Blue";
									}
								
								if(R[10][1] < R[10][4] && mode == 'Авто')
								{
									R[10][1] = R[10][1]+2; 
								}

								if(R[9][1] < R[9][4] && mode == 'Авто')
								{
									R[9][1] = R[9][1]+2; 
								}	
								
								// =====================================
								
								if(R[10][1] > R[10][3] && mode != 'Авто')
								{
									$('#RC10').css('background-color','orange');
								} 
								
								if(R[9][1] > R[9][3] && mode != 'Авто')
								{
									$('#RC9').css('background-color','orange');
								} 
								
								if(S[i][4] == null)
								{									
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								
								if(R[10][1] >= R[10][4] && R[9][1] >= R[9][4] || situationExpired(i,30000))
								{
									S[i][1] = false;
									resetConditions();
									R[9][1] = R[9][5];
									R[10][1] = R[10][5];
									Stimes[i] = null;
									
									$('#RC9').css('background-color','white');
									$('#RC10').css('background-color','white');
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									R[9][1] = R[9][5];
									R[10][1] = R[10][5];
									Stimes[i] = null;
								}*/
								
							
						} else
							{
								threads[2][3] == "Blue";
								threads[5][3] == "Blue";
							
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}						
					break;
					case 3:
						if(S[i][1])
							{	
								
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								if(threads[11][2] == false)
								{
									threads[11][2] = true;
									threads[11][3] = "Orange";
									
									threads[12][2] = true;
									threads[12][3] = "Orange";
									
									threads[27][2] = true;
									threads[27][3] = "Orange";
									
									threads[29][2] = true;
									threads[29][3] = "Orange";
								}
								else
								{
									threads[11][2] = false;
									threads[12][2] = false;
									threads[27][2] = false;
									threads[29][2] = false;
								}
								
								if(R[1][1] > R[1][3] && mode == 'Авто')
								{
									R[1][1] = R[1][1]-8; 
								}	
								
								if(R[2][1] < R[2][4] && mode == 'Авто')
								{
									R[2][1] = R[2][1]+3; 
								}	
								
								if(R[5][1] > R[5][3] && mode == 'Авто')
								{
									R[5][1] = R[5][1]-2; 
								}	
								
								if(R[8][1] < R[8][4] && mode == 'Авто')
								{
									R[8][1] = R[8][1]+7; 
								}	
								
								// =====================================
								
								if(R[1][1] > R[1][3] && mode != 'Авто')
								{
									$('#RC1').css('background-color','orange');
								} 
								
								if(R[2][1] < R[2][4] && mode != 'Авто')
								{
									$('#RC2').css('background-color','orange');
								} 
								
								if(R[5][1] > R[5][3] && mode != 'Авто')
								{
									$('#RC5').css('background-color','orange');
								} 
								
								if(R[8][1] < R[8][4] && mode != 'Авто')
								{
									$('#RC8').css('background-color','orange');
								} 
								
								
								
								if(S[i][4] == null)
								{
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 190,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								
								if(R[8][1] >= R[8][4] && R[5][1] <= R[5][3] && R[2][1] >= R[2][4] && R[1][1] <= R[1][3] || situationExpired(i,120000))
								{
									S[i][1] = false;
									resetConditions();
									
									threads[11][2] = true;
									threads[12][2] = true;
									threads[27][2] = true;
									threads[29][2] = true;
									
									$('#RC1').css('background-color','white');
									$('#RC2').css('background-color','white');
									$('#RC5').css('background-color','white');
									$('#RC8').css('background-color','white');
									
									R[1][1] = R[1][5];
									R[2][1] = R[2][5];
									R[5][1] = R[5][5];
									R[8][1] = R[8][5];
									
									Stimes[i] = null;
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									
									threads[11][2] = true;
									threads[12][2] = true;
									threads[27][2] = true;
									threads[29][2] = true;
									
									R[1][1] = R[1][5];
									R[2][1] = R[2][5];
									R[5][1] = R[5][5];
									R[8][1] = R[8][5];
									
									Stimes[i] = null;
								}*/
								
							} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
					case 4:
						if(S[i][1])
						{
							var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
							dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
							if(R[7][1] < R[7][4] && mode == 'Авто')
							{
								R[7][1] = R[7][1]+2; 
							}	
							
							// =====================================
								
							if(R[7][1] > R[7][3] && mode != 'Авто')
							{
								$('#RC7').css('background-color','orange');
							} 
							
							if(threads[13][3] == "Green")
								{
									threads[13][3] = getMoreOrLessColor(threads[13][3],true);
								} else
									{
										threads[13][3] = "Green";
									}

							if(threads[37][3] == "Green")
								{
									threads[37][3] = getMoreOrLessColor(threads[37][3],true);
								} else
									{
										threads[37][3] = "Green";
									}
									
							if(threads[38][3] == "Green")
								{
									threads[38][3] = getMoreOrLessColor(threads[38][3],true);
								} else
									{
										threads[38][3] = "Green";
									}
								
								// if(threads[17][3] == "Red")
								// {
									// threads[17][3] = getMoreOrLessColor(threads[17][3],true);
								// } else
									// {
										// threads[17][3] = "Red";
									// }
									
								if(threads[25][3] == "Green")
								{
									threads[25][3] = getMoreOrLessColor(threads[25][3],true);
								} else
									{
										threads[25][3] = "Green";
									}
									
								if(threads[28][3] == "Green")
								{
									threads[28][3] = getMoreOrLessColor(threads[28][3],true);
								} else
									{
										threads[28][3] = "Green";
									}
							
								if(S[i][4] == null)
								{	
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
							/*								
							if(situationExpired(i,10000))
							{
								S[i][1] = false;
								resetConditions();
								R[7][1] = R[7][5];
								
								threads[37][3] = "Green";
								threads[17][3] = "Red";
								threads[25][3] = "Green";
								threads[28][3] = "Green";
								
								Stimes[i] = null;
							}
							*/
							if(R[7][1] >= R[7][4] || situationExpired(i,30000))
							{
								S[i][1] = false;
								resetConditions();
								R[7][1] = R[7][5];
								
								threads[37][3] = "Green";
								threads[17][3] = "Red";
								threads[25][3] = "Green";
								threads[28][3] = "Green";
								
								Stimes[i] = null;
								
								$('#RC7').css('background-color','white');
							}
							
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
					
					case 5:
						if(S[i][1])
						{	
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								if(R[7][1] < R[7][4] && mode == 'Авто')
								{
									R[7][1] = R[7][1]+2; 
								}	
								
								// ========================================
								
								if(R[7][1] > R[7][3] && mode != 'Авто')
								{
									$('#RC7').css('background-color','orange');
								} 

								if(threads[25][3] == "Green")
								{
									threads[25][3] = getMoreOrLessColor(threads[25][3],false);
								} else
									{
										threads[25][3] = "Green";
									}
								
								if(threads[28][3] == "Green")
								{
									threads[28][3] = getMoreOrLessColor(threads[28][3],false);
								} else
									{
										threads[28][3] = "Green";
									}
									
								if(threads[36][3] == "Green")
								{
									threads[36][3] = getMoreOrLessColor(threads[36][3],true);
								} else
									{
										threads[36][3] = "Green";
									}
								
								if(threads[13][3] == "Green")
								{
									threads[13][3] = getMoreOrLessColor(threads[13][3],true);
								} else
									{
										threads[13][3] = "Green";
									}
									
								if(threads[37][3] == "Green")
								{
									threads[37][3] = getMoreOrLessColor(threads[37][3],true);
								} else
									{
										threads[37][3] = "Green";
									}
								
								if(S[i][4] == null)
								{
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									
									R[7][1] = R[7][5];
									
									threads[25][3] = "Green";
									threads[28][3] = "Green";
									threads[36][3] = "Green";
									threads[37][3] = "Green";
									
									Stimes[i] = null;
								}
								*/
								
								if(R[7][1] >= R[7][4] || situationExpired(i,30000))
								{
									S[i][1] = false;
									resetConditions();
									
									R[7][1] = R[7][5];
									
									threads[25][3] = "Green";
									threads[28][3] = "Green";
									threads[36][3] = "Green";
									threads[37][3] = "Green";
									
									Stimes[i] = null;
									$('#RC7').css('background-color','white');
								}
								
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
						
					break;
					
					case 6:
						if(S[i][1])
						{	
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								if(threads[21][3] == "Purple")
								{
									threads[21][3] = getMoreOrLessColor(threads[21][3],false);
								} else
									{
										threads[21][3] = "Purple";
									}
									
								if(threads[24][3] == "Purple")
								{
									threads[24][3] = getMoreOrLessColor(threads[24][3],false);
								} else
									{
										threads[24][3] = "Purple";
									}
								
								/*
								if(mode != 'Авто' && R[3][1] > R[3][3])
								{
									$('#RC3').css('background-color','orange');
								} else 
								{
									$('#RC3').css('background-color','white');
								}
								
								if(mode != 'Авто' && R[4][1] > R[4][3])
								{
									$('#RC4').css('background-color','orange');									
								} else 
								{
									$('#RC4').css('background-color','white');
								}*/
								
								
								if(R[3][1] > R[3][3] && mode == 'Авто')
								{									
									R[3][1] = R[3][1]-1; 
								} 

								
								if(R[4][1] > R[4][3] && mode == 'Авто')
								{									
									R[4][1] = R[4][1]-8; 
								} 
								
								// ========================================
								
								if(R[3][1] > R[3][3] && mode != 'Авто')
								{
									$('#RC3').css('background-color','orange');
								} 
								
								if(R[4][1] > R[7][3] && mode != 'Авто')
								{
									$('#RC4').css('background-color','orange');
								}
								
								
								if(S[i][4] == null)
								{
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									
									R[3][1] = R[3][5];
									R[4][1] = R[4][5];
									
									Stimes[i] = null;
								}*/
								
								if(R[3][1] <= R[3][3] && R[4][1] <= R[4][3] || situationExpired(i,60000))
								{
									$('#RC3').css('background-color','orange');
									$('#RC4').css('background-color','orange');
								
									S[i][1] = false;
									resetConditions();
									
									R[3][1] = R[3][5];
									R[4][1] = R[4][5];
									
									Stimes[i] = null;
								}
							
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
					
					case 7:
						if(S[i][1])
						{															
							var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
							dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
							if(S[i][4] == null)
							{
								dialogsCount++;
								
								var dialogPosition = dialogPositions[dialogsCount];
								
								S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
							}
							if(situationExpired(i,10000))
							{
								S[i][1] = false;					
								resetConditions();
								
								Stimes[i] = null;
							}
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					
					break;
					
					case 8:
						if(S[i][1])
						{
							
							var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
							dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
						
							
							if(threads[4][2] == false)
							{
								threads[1][2] = true; 
								threads[1][3] = "Blue";
								
								threads[2][2] = true; 
								threads[2][3] = "Blue";
								
								threads[9][2] = true;
								threads[9][3] = "Blue";
								
								threads[5][2] = true;
								threads[5][3] = "Blue";
								
								threads[4][2] = true;
								threads[4][3] = "Blue";
							}
							else
							{
								threads[1][2] = false; 
								threads[2][2] = false; 
								threads[9][2] = false;
								threads[5][2] = false;
								threads[4][2] = false;
							}
							
							if(R[9][1] > R[9][3] && mode == 'Авто')
							{
								R[9][1] = R[9][1]-2; 
							}
								
							if(R[10][1] > R[10][3] && mode == 'Авто')
							{
								R[10][1] = R[10][1]-2; 
							}
							
							// ========================================
								
								if(R[9][1] > R[9][3] && mode != 'Авто')
								{
									$('#RC9').css('background-color','orange');
								}
								
								if(R[10][1] > R[10][3] && mode != 'Авто')
								{
									$('#RC10').css('background-color','orange');
								}
							
							if(S[i][4] == null)
								{
								
								dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									
									threads[1][2] = true; 
									threads[9][2] = true;
									threads[5][2] = true;
									threads[4][2] = true;
									
									R[9][1] = R[9][5];
									R[10][1] = R[10][5];
									
									Stimes[i] = null;
								}*/
								
								if(R[9][1] <= R[9][3] && R[10][1] <= R[10][3] || situationExpired(i,30000))
								{
									S[i][1] = false;
									resetConditions();
									
									threads[1][2] = true; 
									threads[9][2] = true;
									threads[5][2] = true;
									threads[4][2] = true;
									
									$('#RC9').css('background-color','white');
									$('#RC10').css('background-color','white');
									
									R[9][1] = R[9][5];
									R[10][1] = R[10][5];
									
									Stimes[i] = null;
								}
								
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
					
					case 9:
						if(S[i][1])
						{	
								var dialogText = "<strong>Причина:</strong> "+S[i][2]+"<br/><br/>";
								dialogText += "<strong>Решение:</strong> "+S[i][3]+"<br/><br/>";
								
								if(threads[13][3] == "Green")
								{
									threads[13][3] = getMoreOrLessColor(threads[13][3],true);
								} else
									{
										threads[13][3] = "Green";
									}
								
								if(R[7][1] < R[7][4] && mode == 'Авто')
								{
									R[7][1] = R[7][1]+3; 
								}

								// ========================================
								
								if(R[7][1] > R[7][3] && mode != 'Авто')
								{
									$('#RC7').css('background-color','orange');
								}
								
								
								if(S[i][4] == null)
								{	
									dialogsCount++;
									
									var dialogPosition = dialogPositions[dialogsCount];
									
									S[i][4]  = $('<div style="text-align":left;font-size:12px;"></div>').html(dialogText).dialog({autoOpen: true,resizable: false,height: 150,width: 250,position: dialogPosition,title: 'Аварийная ситуация'});
								}
								/*
								if(situationExpired(i,10000))
								{
									S[i][1] = false;
									resetConditions();
									
									R[7][1] = R[7][5];
									
									Stimes[i] = null;
								}*/

								if(R[7][1] >= R[7][4] || situationExpired(i,30000)) // when max value Stop situation
								{
									S[i][1] = false;
									resetConditions();
									
									R[7][1] = R[7][5];
									
									Stimes[i] = null;
									$('#RC7').css('background-color','white');
								}
								
						} else
							{
								if(S[i][4] != null)
								{
									if(dialogsCount > 0)
									{
										dialogsCount--;
									}
									
									S[i][4].dialog('destroy');
									S[i][4] = null;
								}
							}
					break;
				}
			}			
		}		
	}
	
	function checkLaunchMoreSituations()
	{			
		var c = 0;
		
		for(var i = 1; i < S.length; i++)
		{
			if(S[i][1])
			{
				c++;
			}
		}
		
		if(c >= maxLaunchedSituations)
		{
			launchMoreSituations = false;			
		}
		else
		{
			launchMoreSituations = true;
		}		
		
		return launchMoreSituations;
	}
	
	function raa() // set direction for orange bars
	{
		for(var i = 1; i < U.length; i++)
		{
			var s = Math.round(getRandomBetween(0,1));
			U[i][5] = s;
		}
	}
	
	function ra() 
	{
		for(var i = 1; i < U.length; i++)
		{
			var s = getRandomBetween(U[i][1],U[i][3]).toFixed(2);			
			
				s = parseFloat(s);
				U[i][4] = s; // set current value			
				$("#U"+i).val(s.toString());
				
				// ===== convert to 155px length =======
				var d = U[i][3] - U[i][1];
				var dx = s - U[i][1];
				var pro = dx / d;						
				var pixels = 155 * pro;
				// =====================================
				
				$("#ubar"+i).css("width",pixels.toString()+"px");
		}
	}	
	
	// ============================================================	
	
	function sliderInit() 
	{
		//slider = YAHOO.widget.Slider.getHorizSlider("sliderbg", "sliderthumb", 0, 100, 10);		
	}
	
	function init() // init stage
	{
		canvas = document.getElementById("canvas");
		canvas.width = 1025;
		canvas.height = 799;
		context = canvas.getContext('2d');
		//sliderInit();
		context.scale(scaleVar,1);
	}	
		
	function process()
	{
		context.clearRect(0,0,1025,799);		
		context.save(); 		
		drawStaticObjects(); 
		processSituations();
		drawDynamicObjects();
		showNumbers();		
		updateGauges();
		checkLaunchMoreSituations();
		conditionsListener();		
		context.restore(); 				
	}				

	init();		
	drawGauges();
	process();
	raa();
	ra();
	
	
	
	
	
	
