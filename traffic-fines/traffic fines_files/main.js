$(document).ready(function(){
    $('.number-reg__help_info[data-toggle="popover"]').popover({
        placement : 'left',
        trigger : 'hover',
        html : true,
        content : ''
    });
    $('.number-reg__help_part[data-toggle="popover"]').popover({
        placement : 'bottom',
        trigger : 'hover',
        html : true,
        content : ''
    });
    $('.entity-btn').click(function () {
		$('html, body').animate({
			scrollTop: $('#entity-form').offset().top
		}, 2000);   
    });
    $('.arrow-down').click(function () {
    var arrow = $('.arrow-down').prev().next();
        console.log(arrow);
     $('html, body').animate({
			scrollTop: $(arrow).offset().top
		}, 1000);   
    });
    $('#send_me').click(function () {
        $('#show-email').toggleClass('show').fadeIn(500);
        $('#user_mail').focus();
    });
    $('#input-tel').focusin(function () {
        $('.b-input-tel').addClass('focus');
    });
    $('#input-tel').focusout(function () {
        $('.b-input-tel').removeClass('focus');
    });
});
function getName(str){
    var filename = '';
	if (str[0].name!=''){
		for (var k = 0; k < str.length; k++) {
			name = str[k].name;
			if (name.lastIndexOf('\\')){
				var i = name.lastIndexOf('\\')+1;
			} else{
				var i = name.lastIndexOf('/')+1;
			}
			filename += ' ' + name.slice(i);
		}
	} else{
		if (str.lastIndexOf('\\')){
			var i = str.lastIndexOf('\\')+1;
		} else{
			var i = str.lastIndexOf('/')+1;
		}	
		var filename = str.slice(i);	
	}			
    var uploaded = document.getElementById("fileformlabel");
    uploaded.innerHTML = filename;
}

$(window).load(windowSize); // при загрузке
$(window).resize(windowSize); // при изменении размеров
function windowSize(){
    if ($(window).width() >= '992'){
        $('li.dropdown-li').hover(function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    }
    else{
        $('.height-header').click(function ()  {
            if ( $('#navbar-collapse').hasClass("in") ){
             $('.navbar-toggle').addClass('collapsed');
             $('.navbar-toggle').attr( "aria-expanded", "false" );
             $('#navbar-collapse').removeClass("in").delay(500).fadeOut(500);
            }            
        });
        $('.login-mobile').click(function ()  {
            if ( $('#navbar-collapse').hasClass("in") ){
                 $('.navbar-toggle').addClass('collapsed');
                 $('.navbar-toggle').attr( "aria-expanded", "false" );
                 $('#navbar-collapse').removeClass("in").delay(500).fadeOut(500);     
            }
            else{
                $('.person-menu').toggleClass('show');    
            }              
        }); 
        if ($(window).width() <= '767'){
            $('.number-reg__help').off('click');
            $('.number-reg__help').on('click', function() {
                $('.b-help-img').toggleClass('show');
                $(".number-reg__help").bind("mouseleave", function(){
                    $('.b-help-img').removeClass('show');
                });
            }); 
        }

    }
}

function LoginForm(type){
	type = type || 'user';
	if (type=='user'){
		$('#modal_login_title').text('Вход в личный кабинет пользователя');
		$('#form_modal_login').attr('action', SITE_URL + 'dir/modules/red_user/enter.php');
		$('#modal_forget_link').attr('href', SITE_URL + 'lichnyj_kabinet/?do=reg_restore');
		$('#modal_reg_link').attr('href', SITE_URL + 'registratsija/');
		$('#modal_social_login').show();
		$('#ModalLogin').modal();
	} else if (type=='partner'){
		$('#modal_login_title').text('Вход в личный кабинет юридического лица');
		$('#form_modal_login').attr('action', SITE_URL + 'dir/modules/partner/enter.php');
		$('#modal_forget_link').attr('href', SITE_URL + 'partneram/?do=reg_restore');
		$('#modal_reg_link').attr('href', SITE_URL + 'registratsija/?your=1');
		$('#modal_social_login').hide();
		$('#ModalLogin').modal();
	} else if (type=='webmaster'){
		$('#modal_login_title').text('Вход в личный кабинет вебмастера');
		$('#form_modal_login').attr('action', SITE_URL + 'dir/modules/partner/enter.php');
		$('#modal_forget_link').attr('href', SITE_URL + 'partneram/?do=reg_restore');
		$('#modal_reg_link').attr('href', SITE_URL + 'registratsija/?widget=1');
		$('#modal_social_login').hide();
		$('#ModalLogin').modal();
	}
}

var fit_modal_body;
fit_modal_body = function(modal) {
  var body, bodypaddings, header, headerheight, height, modalheight;
  header = $(".modal-header", modal);
  footer = $(".modal-footer", modal);
  body = $(".modal-body", modal);
  modalheight = parseInt(modal.css("height"));
  headerheight = parseInt(header.css("height")) + parseInt(header.css("padding-top")) + parseInt(header.css("padding-bottom"));
  footerheight = parseInt(footer.css("height")) + parseInt(footer.css("padding-top")) + parseInt(footer.css("padding-bottom"));
  bodypaddings = parseInt(body.css("padding-top")) + parseInt(body.css("padding-bottom"));
  height = $(window).height() - headerheight - footerheight - bodypaddings - 150;
  return body.css({"max-height": "" + height + "px", 'height':'auto'});
};

var prevStep = 5;
var nextStep = 10;
function StartProcessing(header, body){
	prevStep = 5;
	nextStep = 10;
	if (header==''){
		$('#processing-title').hide();
	}else{
		$('#processing-title').show();
		$('#processing-title').text(header);
	}
	$('#processing-text').html(body);
	$('#ModalProcessing').modal({keyboard: false, backdrop: 'static'});
	processing_id = setInterval(function(){$('#processing_bar').addClass('p'+nextStep); $('#processing_bar').removeClass('p'+prevStep); prevStep = nextStep; nextStep += 5; if (nextStep==105) {nextStep = 5;prevStep = 100;}}, 1000);
	return processing_id;
}
function StopProcessing(processing_id){
	clearInterval(processing_id);
	setTimeout(function(){
		$('#ModalProcessing').modal('hide');
		nextStep = nextStep || 15;
		prevStep = prevStep || 10;
		$('#processing_bar').removeClass('p'+nextStep);
		$('#processing_bar').removeClass('p'+prevStep);
		$('#processing_bar').addClass('p5');
	}, 300);
}

function SelectAuto(auto_cdi, obj){
	$('#auto_cdi').val(auto_cdi);
	$('#dropdownMenuAuto li').removeClass('active');
	$(obj).addClass('active');
}
function SelectDriver(voditel_number, obj){
	$('#voditel_number').val(voditel_number);
	$('#dropdownMenuDrivers li').removeClass('active');
	$(obj).addClass('active');
}

function blink_err(err_id, err_text, validate_step){
	validate_step = validate_step || 1;
	err_text = err_text || '';
	$('#'+err_id).focus();
	if (validate_step==2){
		$('#'+err_id).parent().parent().addClass('has-error');
	}else{
		$('#'+err_id).parent().addClass('has-error');
	}
	if (err_text!=''){
		$('#error_text_'+err_id).text(err_text);
	}
	setTimeout(function() { 
		if (validate_step==2){
			$('#'+err_id).parent().parent().removeClass('has-error');
		}else{
			$('#'+err_id).parent().removeClass('has-error');
		}
		if (err_text!=''){
			$('#error_text_'+err_id).text('');
		}
	}, 4000); 
}

function check_payment_phone(){
	var phone = $('#payment_phone').val();
	
	phone = phone.replace('+7','');
	phone = phone.replace('-','');
	phone = phone.replace('(','');
	phone = phone.replace(')','');
	var val_phone = /^[0-9]{10}$/; 

	if (!phone.match(val_phone)){
		$("#payment_phone").focus();
		blink_err('payment_phone', 'Пожалуйста, введите номер телефона корректно');
		return false;
	}else {
		return true;
	}
}

//функция проверки телефона при оплате
function check_payment_email(){
	var email = $('#payment_email').val();
	var val_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

	if (!email.match(val_email)){
		$("#payment_email").focus();
		blink_err('payment_email', 'Пожалуйста, введите email корректно');
		return false;
	}else {
		return true;
	}
}

//функция проверки ввода фио
function check_fio_key(){
	/*var input = $('#payment_fio').val();
	input = input.replace(/\s+/g," ");
	input = input || '';
	var arr_fio = input.split(" ");
	var val_input = /^[а-яА-ЯёЁ\-]+[\s]+[а-яА-ЯёЁ\-]+[\s]+[а-яА-ЯёЁ\-]+$/;
	if (input.match(val_input) && input.length>=8  && arr_fio[0].length>=2 && arr_fio[1].length>=2 && arr_fio[2].length>=2){
		$("#fio_err").html("");
		$("#fio_err").fadeOut(200);
	}*/
}

function check_fio(){
	$('#payment_fio').val($.trim($('#payment_fio').val()));
	var input = $('#payment_fio').val();

	input = input.replace(/\s+/g, " ");
	var arr_fio = input.split(" ");

	var val_input = /^[а-яА-ЯёЁ\-]+[\s]+[а-яА-ЯёЁ\-]+[\s]+[а-яА-ЯёЁ\-]+$/;
	if (!input.match(val_input) || input.length==0  || arr_fio[0].length<2 || arr_fio[1].length<2 || arr_fio[2].length<2){
		$("#payment_fio").focus();
		blink_err('payment_fio', 'Пожалуйста, введите ФИО полностью');
		return false;
	}else {
		return true;
	}
}

function check_user_mail(user_mail){
	user_mail = user_mail || 'user_mail';
	var mail = $("#"+user_mail).val();
	var val_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!mail.match(val_mail) || mail.length==0){
		blink_err(user_mail, 'Укажите корректный e-mail адрес');
		return false;
	}
	return true;
}

function check_auto_cdi(validate_step){
	validate_step = validate_step || 1;
	var auto_cdi = $('#auto_cdi').val();
	var val_auto_cdi = /^[0-9]{2}[ ][А-Яа-я]{2}[ ][0-9]{6}$/; 
	var val_auto_cdi_2 = /^[0-9]{2}[ ][0-9]{2}[ ][0-9]{6}$/;
	var val_auto_cdi_3 = /^[0-9]{2}[А-Яа-я]{2}[0-9]{6}$/; 
	var val_auto_cdi_4 = /^[0-9]{2}[0-9]{2}[0-9]{6}$/;
	if (!auto_cdi.match(val_auto_cdi) && !auto_cdi.match(val_auto_cdi_2) && !auto_cdi.match(val_auto_cdi_3) && !auto_cdi.match(val_auto_cdi_4) && auto_cdi.length>0){
		blink_err('auto_cdi', 'Ошибка при вводе! Пример 12АА123456 или 1215123456', validate_step);
		return false;
	}

	if (auto_cdi.length==0){
		blink_err('auto_cdi', 'Ошибка при вводе! Пример 12АА123456 или 1215123456', validate_step);
		return false;
	}
	return true;
}
function check_voditel_number(validate_step){
	validate_step = validate_step || 1;
	var voditel_number = $('#voditel_number').val();
	var val_voditel_number = /^[0-9]{2}[ ][А-Яа-я]{2}[ ][0-9]{6}$/; 
	var val_voditel_number_2 = /^[0-9]{2}[ ][0-9]{2}[ ][0-9]{6}$/;
	var val_voditel_number_3 = /^[0-9]{2}[А-Яа-я]{2}[0-9]{6}$/; 
	var val_voditel_number_4 = /^[0-9]{2}[0-9]{2}[0-9]{6}$/;
	
	if (voditel_number.length==0){
		return false;
	}

	if (!voditel_number.match(val_voditel_number) && !voditel_number.match(val_voditel_number_2) && !voditel_number.match(val_voditel_number_3) && !voditel_number.match(val_voditel_number_4) && voditel_number.length>0){
		blink_err('voditel_number', 'Ошибка при вводе! Пример 12АА123456 или 1215123456', validate_step);
		return false;
	}
	return true;
}
function check_user_inn(){
	var auto_cdi = $('#user_inn').val();
	var val_auto_cdi = /^\d{12}$/ ; 
	if (!auto_cdi.match(val_auto_cdi) && auto_cdi.length>0){
		blink_err('user_inn', "Ошибка при вводе! Пример 121512345678");
		return false;
	}

	if (auto_cdi.length==0){
		blink_err('user_inn', "Ошибка при вводе! Пример 121512345678");
		return false;
	}
	return true;
}
function check_user_cnils(){
	var auto_cdi = $('#user_cnils').val();
	var val_auto_cdi = /^(?:[- ]*\d){11}$/; 

	if (!auto_cdi.match(val_auto_cdi) && auto_cdi.length>0){
		blink_err('user_cnils', "Ошибка при вводе! Пример 123-456-789 12");
		return false;
	}
	if (auto_cdi.length==0){
		blink_err('user_cnils', "Ошибка при вводе! Пример 123-456-789 12");
		return false;
	}
	return true;
}

function add_new_client(show_modal){
	show_modal = show_modal || 0;
	user_mail = $("#user_mail").val();
	var ajax_result = false;
	$.ajax({
		type: "POST",
		url: SITE_URL + "/dir/modules/sh_bill/add_client_short.php",
		data: {
			auto_number:	$("#auto_number").val(), 
			auto_region:	$("#auto_region").val(),
			auto_cdi:		$("#auto_cdi").val(),
			voditel_number:	$("#voditel_number").val(),
			user_inn:		$("#user_inn").val(),
			user_cnils:		$("#user_cnils").val(),
			user_passport:	$("#user_passport").val(),
			user_mail: user_mail
		},
		async: false,
		success: function(data){
			var response = data.replace(/^\s+/, '').replace(/\s+$/, '');
			if (response=="success"){
				if (show_modal==1){
					$('#suscribe_user_mail').text(user_mail);
					$('#ModalSuccessSubscribe').modal();
				}
				ajax_result = true;
			} else{
				blink_err('user_mail', response);
			}
		}
	});
	return ajax_result;
}

function set_session_vars(){
	$.post(SITE_URL+'dir/modules/sh_bill/set_session_vars.php',{
		used_auto_cdi: $("#auto_cdi").val(),
		used_voditel_number: $("#voditel_number").val(),
		used_user_mail: $("#user_mail").val(),
		auto_select: $("#auto_select").val(),
		user_id: $("#user_id").val()
	});
}
function set_session_vars_nalogi(){
	$.post(SITE_URL+'dir/modules/sh_bill/set_session_vars.php',{
		used_user_inn: $("#user_inn").val(), 
		used_user_cnils: $("#user_cnils").val(),
		used_postanov_number: $("#postanov_number").val(),
		used_by_search: $("#by_search").val()
	});
}
function set_session_vars_fssp(){
	$.post("/dir/modules/sh_bill/set_session_vars.php",{
		used_user_inn: $("#user_inn").val(), 
		used_user_cnils: $("#user_cnils").val(),
		used_user_passport: $("#user_passport").val(),
		used_postanov_number: $("#postanov_number").val(),
		used_by_search: $("#by_search").val()
	});
}

function set_pay_ammount(type){
	type = $("#pay_sistem").val();
	type = type || 'gis';
	var pay_summ = 0.00;
	var pay_add = 0.00;
	var for_pay = 0.00;
	var discount_pay = 0.00;
	var counter = 0;
	$('[id ^= "bill_check_"]').each(function(){
		var id = $(this).attr('id').split("_").slice(-1);
		counter++;
		if ($(this).is(":checked")){
			pay_summ = pay_summ + parseFloat($("#postanov_summ_"+id).val());
			pay_add = pay_add + parseFloat($("#postanov_add_"+id).val());
			discount_pay = discount_pay + parseFloat($("#postanov_discount_"+id).val());
		}
	});
	if (pay_summ.toFixed(2)>0)
		$('.pay_content').show();
	else{
		$('.checkAll').prop('checked', false);
		$('.pay_content').hide();
	}
	
	for_pay = pay_summ + pay_add;
	full_pay = pay_summ + discount_pay;
	
	$("#pay_summ_info").html(full_pay.toFixed(2));
	$("#pay_summ_info_footer").html(full_pay.toFixed(2));
	$("#pay_summ").val(pay_summ.toFixed(2));
	$("#pay_addon_info").html(pay_add.toFixed(2));
	$("#pay_comission").val(pay_add.toFixed(2));
	$("#for_pay_info").html(for_pay.toFixed(2));
	$("#pay_discount").val(discount_pay.toFixed(2));
	$("#pay_discount_info").html(discount_pay.toFixed(2));
	$("#total_out").html(full_pay.toFixed(2));
	$("#top_count_comission").html(pay_add.toFixed(2));
	$("#top_count_discount").html(discount_pay.toFixed(2)+' р.');
	$("#top_count_total").html(for_pay.toFixed(2));
	$("#count_bill").html(counter + ' ' + Propis(counter));
}

function check_postanov_number(){
	var postanov_number = $('#postanov_number').val();
	var val_postanov_number = /^[0-9А-Яа-яa-zA-Z]+$/;

	if (!postanov_number.match(val_postanov_number) && postanov_number.length>0){
		blink_err('postanov_number', 'Ошибка! Введите 20 или 25 знаков УИН');
		return false;
	}

	if (postanov_number.length!=20 && postanov_number.length!=25){
		blink_err('postanov_number', 'Ошибка! Введите 20 или 25 знаков УИН');
		return false;
	}
	return true;
}

function find_by_number(type){
	type = type || 'fines';
	if ($("#postanov_number").val()==""){ 
		blink_err('postanov_number');
		return false;
	}
	if (check_postanov_number()){
		if (type=='fines'){
			var processing_id = StartProcessing('Проверка штрафов ГИБДД', 'Процесс может длиться до 30 секунд...');
		} else if (type=='nalogi'){
			var processing_id = StartProcessing('Проверка неоплаченных налогов', 'Процесс может длиться до 30 секунд...');
		} else if (type=='fssp'){
			var processing_id = StartProcessing('Проверка исполнительных производств ФССП', 'Процесс может длиться до 30 секунд...');
		} else{
			var processing_id = StartProcessing('Проверка начислений', 'Процесс может длиться до 30 секунд...');
		}
		$.post(SITE_URL + "dir/modules/soap/by_postanov.php",{
			postanov_number: $("#postanov_number").val(),
			user_id: $("#user_id").val(),
			type: type
			}, function(data){
				if (type=='fines'){
					$('#div_breadcrumb').removeClass('breadcrumb_position_3');
				} else{
					$('#div_breadcrumb').removeClass('breadcrumb_position_2');
				}
				$('html,body').animate({
					scrollTop: $("#main_content").offset().top-75},
				1000);
				StopProcessing(processing_id);
				$("#main_content").html(data);
			}
		);
	}
}

function set_interval(){
	var period = $('input[name=period]:checked', '#interval_form').val();
	switch (period) { 	 
		case "today": 
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var today=day+'-'+month+'-'+year;
			$("#min_date").val(today);
			$("#max_date").val(today);
		break; 
		case "week": 
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year;
			data = max_day.split('-'); 
			data = new Date(data[2], +data[1]-1, +data[0]-7, 0, 0, 0, 0);
			var month = data.getMonth()+1;
			if (month<10) month='0'+month;
			var day = data.getDate();
			if (day<10) day='0'+day;
			data = [day,month,data.getFullYear()]; 
			data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g,"$10$2"); 
			var min_day=data;
			$("#min_date").val(min_day);
			$("#max_date").val(max_day);
		break;
		case "halfyear": 
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year;
			data = max_day.split('-'); 
			data = new Date(data[2], +data[1]-7, +data[0], 0, 0, 0, 0);
			var month = data.getMonth()+1;
			if (month<10) month='0'+month;
			var day = data.getDate();
			if (day<10) day='0'+day;
			data = [day,month,data.getFullYear()]; 
			data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g,"$10$2"); 
			var min_day=data;
			if (min_day<10) min_day='0'+min_day;
			$("#min_date").val(min_day);
			$("#max_date").val(max_day);
		break;
		case "month": 
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year;
			data = max_day.split('-'); 
			data = new Date(data[2], +data[1]-2, +data[0], 0, 0, 0, 0);
			var month = data.getMonth()+1;
			if (month<10) month='0'+month;
			var day = data.getDate();
			if (day<10) day='0'+day;
			data = [day,month,data.getFullYear()];
			data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g,"$10$2"); 
			var min_day=data;
			if (min_day<10) min_day='0'+min_day;
			$("#min_date").val(min_day);
			$("#max_date").val(max_day);
		break; 
		case "year": 
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year;
			data = max_day.split('-'); 
			data = new Date(data[2]-1, +data[1]-1, +data[0], 0, 0, 0, 0);
			var month = data.getMonth()+1;
			if (month<10) month='0'+month;
			var day = data.getDate();
			if (day<10) day='0'+day;
			data = [day,month,data.getFullYear()]; 
			data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g,"$10$2"); 
			var min_day=data;
			$("#min_date").val(min_day);
			$("#max_date").val(max_day);
		break;
		case "3month":
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year;
			data = max_day.split('-'); 
			data = new Date(data[2], +data[1]-4, +data[0], 0, 0, 0, 0);
			var month = data.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			data = [day,month,data.getFullYear()];
			data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g,"$10$2"); 
			var min_day=data;
			if (min_day<10) min_day='0'+min_day;
			$("#min_date").val(min_day);
			$("#max_date").val(max_day);
		break;
		case "all":
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var max_day=day+'-'+month+'-'+year; 
			$("#min_date").val("01-10-2013");
			$("#max_date").val(max_day);
		break;
	}
}
function set_pay_filter(){
	min_date = $("#min_date").val();
	max_date = $("#max_date").val();
	var show_error = 0;

	if ($("#show_error").is(":checked")) show_error = 1;

	var processing_id = StartProcessing('Пожалуйста подождите', 'Идет загрузка данных ...');

	$.post(SITE_URL + "dir/modules/red_user/sh_pay.php",{
			show_error: show_error,
			min_date: min_date,
			max_date: max_date
		},function(data){
			$("#sh_payment_div").html(data);
			StopProcessing(processing_id);
		}
	);
	
}
function sh_pay_info(payment_id) {
	$.post(SITE_URL + "dir/modules/red_user/user_pay_info.php",{
			payment_id: payment_id
		}, function(data){
			$("#user_pay_info_"+payment_id).html(data);
			$("#user_pay_info_"+payment_id).show();
		}
	);
}

function set_pay_pdf(){
	$('#interval_form').attr('action', SITE_URL + 'dir/modules/red_user/sh_pay_pdf.php');
	$('#interval_form').submit();
}

function LoadMore(url, send_data, id_load_block, id_button){
	id_button = id_button || '';
	if (id_button!=''){
		$("#"+id_button).button('loading');
	}
	$.ajax({
		url: url,
		type: 'post',
		data: send_data,
		success: function (data) {
			if (id_button!=''){
				$("#"+id_button).remove();
			}
			$("#"+id_load_block).append(data);
		}
	});
}
function AddLike(url, send_data, obj){
	$.ajax({
		url: url,
		type: 'post',
		data: send_data,
		success: function (data) {
			if (data!=''){
				$(obj).text(data);
				$(obj).attr('onclick', '');
			}
		}
	});
}