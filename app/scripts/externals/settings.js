 var site_settings = '<div class="ts-button">' + '<span class="fa fa-cogs fa-spin"></span>' + '</div>' + '<div class="ts-body">' + '<div class="ts-title">Themes</div>' + '<div class="ts-themes">' + '<a href="#" class="active" data-theme="css/theme-default.css"><img src="img/themes/default.jpg"/></a>' + '<a href="#" data-theme="css/theme-brown.css"><img src="img/themes/brown.jpg"/></a>' + '<a href="#" data-theme="css/theme-blue.css"><img src="img/themes/blue.jpg"/></a>' + '<a href="#" data-theme="css/theme-white.css"><img src="img/themes/light.jpg"/></a>' + '<a href="#" data-theme="css/theme-black.css"><img src="img/themes/black.jpg"/></a>' + '</div>' + '<div class="ts-title">Layout</div>' + '<div class="ts-row">' + '<label class="check"><input type="radio" class="iradio" name="st_layout_boxed" value="0" checked/> Full Width</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="radio" class="iradio" name="st_layout_boxed" value="1"/> Boxed</label>' + '</div>' + '<div class="ts-title">Options</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_head_fixed" value="1"/> Fixed Header</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_fixed" value="1" checked/> Fixed Sidebar</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_scroll" value="1"/> Scroll Sidebar</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_right" value="1"/> Right Sidebar</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_custom" value="1"/> Custom Navigation</label>' + '</div>' + '<div class="ts-row">' + '<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_toggled" value="1"/> Toggled Navigation</label>' + '</div>' + '</div>';

 var settings_block = document.createElement('div');
 settings_block.className = "theme-settings";
 settings_block.innerHTML = site_settings;
 document.body.appendChild(settings_block);

 $(document).ready(function() {

     /* Default settings */
     var theme_settings = {
         st_head_fixed: 0,
         st_sb_fixed: 1,
         st_sb_scroll: 1,
         st_sb_right: 0,
         st_sb_custom: 0,
         st_sb_toggled: 0,
         st_layout_boxed: 0
     };
     /* End Default settings */

     set_settings(theme_settings, false);

     $(".theme-settings input").on("ifClicked", function() {

         var input = $(this);

         if (input.attr("name") != 'st_layout_boxed') {

             if (!input.prop("checked")) {
                 theme_settings[input.attr("name")] = input.val();
             } else {
                 theme_settings[input.attr("name")] = 0;
             }

         } else {
             theme_settings[input.attr("name")] = input.val();
         }

         /* Rules */
         if (input.attr("name") === 'st_sb_fixed') {
             if (theme_settings.st_sb_fixed == 1) {
                 theme_settings.st_sb_scroll = 1;
             } else {
                 theme_settings.st_sb_scroll = 0;
             }
         }

         if (input.attr("name") === 'st_sb_scroll') {
             if (theme_settings.st_sb_scroll == 1 && theme_settings.st_layout_boxed == 0) {
                 theme_settings.st_sb_fixed = 1;
             } else if (theme_settings.st_sb_scroll == 1 && theme_settings.st_layout_boxed == 1) {
                 theme_settings.st_sb_fixed = -1;
             } else if (theme_settings.st_sb_scroll == 0 && theme_settings.st_layout_boxed == 1) {
                 theme_settings.st_sb_fixed = -1;
             } else {
                 theme_settings.st_sb_fixed = 0;
             }
         }

         if (input.attr("name") === 'st_layout_boxed') {
             if (theme_settings.st_layout_boxed == 1) {
                 theme_settings.st_head_fixed = -1;
                 theme_settings.st_sb_fixed = -1;
                 theme_settings.st_sb_scroll = 1;
             } else {
                 theme_settings.st_head_fixed = 0;
                 theme_settings.st_sb_fixed = 1;
                 theme_settings.st_sb_scroll = 1;
             }
         }
         /* End Rules */

         set_settings(theme_settings, input.attr("name"));
     });

     /* Change Theme */
     $(".ts-themes a").click(function() {
         $(".ts-themes a").removeClass("active");
         $(this).addClass("active");
         $("#theme").attr("href", $(this).data("theme"));
         return false;
     });
     /* END Change Theme */

     /* Open/Hide Settings */
     $(".ts-button").on("click", function() {
         $(".theme-settings").toggleClass("active");
     });
     /* End open/hide settings */
 });

 function set_settings(theme_settings, option) {

     /* Start Header Fixed */
     if (theme_settings.st_head_fixed == 1)
         $(".page-container").addClass("page-navigation-top-fixed");
     else
         $(".page-container").removeClass("page-navigation-top-fixed");
     /* END Header Fixed */

     /* Start Sidebar Fixed */
     if (theme_settings.st_sb_fixed == 1) {
         $(".page-sidebar").addClass("page-sidebar-fixed");
     } else
         $(".page-sidebar").removeClass("page-sidebar-fixed");
     /* END Sidebar Fixed */

     /* Start Sidebar Fixed */
     if (theme_settings.st_sb_scroll == 1) {
         $(".page-sidebar").addClass("scroll").mCustomScrollbar("update");
     } else
         $(".page-sidebar").removeClass("scroll").css("height", "").mCustomScrollbar("disable", true);

     /* END Sidebar Fixed */

     /* Start Right Sidebar */
     if (theme_settings.st_sb_right == 1)
         $(".page-container").addClass("page-mode-rtl");
     else
         $(".page-container").removeClass("page-mode-rtl");
     /* END Right Sidebar */

     /* Start Custom Sidebar */
     if (theme_settings.st_sb_custom == 1)
         $(".page-sidebar .x-navigation").addClass("x-navigation-custom");
     else
         $(".page-sidebar .x-navigation").removeClass("x-navigation-custom");
     /* END Custom Sidebar */

     /* Start Custom Sidebar */
     if (option && option === 'st_sb_toggled') {
         if (theme_settings.st_sb_toggled == 1) {
             $(".page-container").addClass("page-navigation-toggled");
             $(".x-navigation-minimize").trigger("click");
         } else {
             $(".page-container").removeClass("page-navigation-toggled");
             $(".x-navigation-minimize").trigger("click");
         }
     }
     /* END Custom Sidebar */

     /* Start Layout Boxed */
     if (theme_settings.st_layout_boxed == 1)
         $("body").addClass("page-container-boxed");
     else
         $("body").removeClass("page-container-boxed");
     /* END Layout Boxed */

     /* Set states for options */
     if (option === false || option === 'st_layout_boxed' || option === 'st_sb_fixed' || option === 'st_sb_scroll') {
         for (option in theme_settings) {
             set_settings_checkbox(option, theme_settings[option]);
         }
     }
     /* End states for options */

     /* Call resize window */
     $(window).resize();
     /* End call resize window */
 }

 function set_settings_checkbox(name, value) {

     if (name == 'st_layout_boxed') {

         $(".theme-settings").find("input[name=" + name + "]").prop("checked", false).parent("div").removeClass("checked");

         var input = $(".theme-settings").find("input[name=" + name + "][value=" + value + "]");

         input.prop("checked", true);
         input.parent("div").addClass("checked");

     } else {

         var input = $(".theme-settings").find("input[name=" + name + "]");

         input.prop("disabled", false);
         input.parent("div").removeClass("disabled").parent(".check").removeClass("disabled");

         if (value === 1) {
             input.prop("checked", true);
             input.parent("div").addClass("checked");
         }
         if (value === 0) {
             input.prop("checked", false);
             input.parent("div").removeClass("checked");
         }
         if (value === -1) {
             input.prop("checked", false);
             input.parent("div").removeClass("checked");
             input.prop("disabled", true);
             input.parent("div").addClass("disabled").parent(".check").addClass("disabled");
         }

     }
 }


 $(function() {

     var formElements = function() {
         // Bootstrap datepicker
         var feDatepicker = function() {
                 if ($(".datepicker").length > 0) {
                     $(".datepicker").datepicker({ format: 'yyyy-mm-dd' });
                     $("#dp-2,#dp-3,#dp-4").datepicker(); // Sample
                 }

             } // END Bootstrap datepicker

         //Bootstrap timepicker
         var feTimepicker = function() {
                 // Default timepicker
                 if ($(".timepicker").length > 0)
                     $('.timepicker').timepicker();

                 // 24 hours mode timepicker
                 if ($(".timepicker24").length > 0)
                     $(".timepicker24").timepicker({ minuteStep: 5, showSeconds: true, showMeridian: false });

             } // END Bootstrap timepicker

         //Daterangepicker 
         var feDaterangepicker = function() {
                 if ($(".daterange").length > 0)
                     $(".daterange").daterangepicker({ format: 'YYYY-MM-DD', startDate: '2013-01-01', endDate: '2013-12-31' });
             }
             // END Daterangepicker

         //Bootstrap colopicker        
         var feColorpicker = function() {
                 // Default colorpicker hex
                 if ($(".colorpicker").length > 0)
                     $(".colorpicker").colorpicker({ format: 'hex' });

                 // RGBA mode
                 if ($(".colorpicker_rgba").length > 0)
                     $(".colorpicker_rgba").colorpicker({ format: 'rgba' });

                 // Sample
                 if ($("#colorpicker").length > 0)
                     $("#colorpicker").colorpicker();

             } // END Bootstrap colorpicker

         //Bootstrap select
         var feSelect = function() {
                 if ($(".select").length > 0) {
                     $(".select").selectpicker();

                     $(".select").on("change", function() {
                         if ($(this).val() == "" || null === $(this).val()) {
                             if (!$(this).attr("multiple"))
                                 $(this).val("").find("option").removeAttr("selected").prop("selected", false);
                         } else {
                             $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
                         }
                     });
                 }
             } //END Bootstrap select


         //Validation Engine
         var feValidation = function() {
                 if ($("form[id^='validate']").length > 0) {

                     // Validation prefix for custom form elements
                     var prefix = "valPref_";

                     //Add prefix to Bootstrap select plugin
                     $("form[id^='validate'] .select").each(function() {
                         $(this).next("div.bootstrap-select").attr("id", prefix + $(this).attr("id")).removeClass("validate[required]");
                     });

                     // Validation Engine init
                     $("form[id^='validate']").validationEngine('attach', {
                         promptPosition: "bottomLeft",
                         scroll: false,
                         onValidationComplete: function(form, status) {
                             form.validationEngine("updatePromptsPosition");
                         },
                         prettySelect: true,
                         usePrefix: prefix
                     });
                 }
             } //END Validation Engine

         //Masked Inputs
         var feMasked = function() {
                 if ($("input[class^='mask_']").length > 0) {
                     $("input.mask_tin").mask('99-9999999');
                     $("input.mask_ssn").mask('999-99-9999');
                     $("input.mask_date").mask('9999-99-99');
                     $("input.mask_product").mask('a*-999-a999');
                     $("input.mask_phone").mask('99 (999) 999-99-99');
                     $("input.mask_phone_ext").mask('99 (999) 999-9999? x99999');
                     $("input.mask_credit").mask('9999-9999-9999-9999');
                     $("input.mask_percent").mask('99%');
                 }
             } //END Masked Inputs

         //Bootstrap tooltip
         var feTooltips = function() {
                 $("body").tooltip({ selector: '[data-toggle="tooltip"]', container: "body" });
             } //END Bootstrap tooltip

         //Bootstrap Popover
         var fePopover = function() {
                 $("[data-toggle=popover]").popover();
                 $(".popover-dismiss").popover({ trigger: 'focus' });
             } //END Bootstrap Popover

         //Tagsinput
         var feTagsinput = function() {
                 if ($(".tagsinput").length > 0) {

                     $(".tagsinput").each(function() {

                         if ($(this).data("placeholder") != '') {
                             var dt = $(this).data("placeholder");
                         } else
                             var dt = 'add a tag';

                         $(this).tagsInput({ width: '100%', height: 'auto', defaultText: dt });
                     });

                 }
             } // END Tagsinput

         //iCheckbox and iRadion - custom elements
         var feiCheckbox = function() {
                 if ($(".icheckbox").length > 0) {
                     $(".icheckbox,.iradio").iCheck({ checkboxClass: 'icheckbox_minimal-grey', radioClass: 'iradio_minimal-grey' });
                 }
             }
             // END iCheckbox

         //Bootstrap file input
         var feBsFileInput = function() {

                 if ($("input.fileinput").length > 0)
                     $("input.fileinput").bootstrapFileInput();

             }
             //END Bootstrap file input

         return { // Init all form element features
             init: function() {
                 feDatepicker();
                 feTimepicker();
                 feColorpicker();
                 feSelect();
                 feValidation();
                 feMasked();
                 feTooltips();
                 fePopover();
                 feTagsinput();
                 feiCheckbox();
                 feBsFileInput();
                 feDaterangepicker();
             }
         }
     }();

     var uiElements = function() {

         //Datatables
         var uiDatatable = function() {
                 if ($(".datatable").length > 0) {
                     $(".datatable").dataTable();
                     $(".datatable").on('page.dt', function() {
                         onresize(100);
                     });
                 }

                 if ($(".datatable_simple").length > 0) {
                     $(".datatable_simple").dataTable({ "ordering": false, "info": false, "lengthChange": false, "searching": false });
                     $(".datatable_simple").on('page.dt', function() {
                         onresize(100);
                     });
                 }
             } //END Datatable        

         //RangeSlider // This function can be removed or cleared.
         var uiRangeSlider = function() {

                 //Default Slider with start value
                 if ($(".defaultSlider").length > 0) {
                     $(".defaultSlider").each(function() {
                         var rsMin = $(this).data("min");
                         var rsMax = $(this).data("max");

                         $(this).rangeSlider({
                             bounds: { min: 1, max: 200 },
                             defaultValues: { min: rsMin, max: rsMax }
                         });
                     });
                 } //End Default

                 //Date range slider
                 if ($(".dateSlider").length > 0) {
                     $(".dateSlider").each(function() {
                         $(this).dateRangeSlider({
                             bounds: { min: new Date(2012, 1, 1), max: new Date(2015, 12, 31) },
                             defaultValues: { min: new Date(2012, 10, 15), max: new Date(2014, 12, 15) }
                         });
                     });
                 } //End date range slider

                 //Range slider with predefinde range            
                 if ($(".rangeSlider").length > 0) {
                     $(".rangeSlider").each(function() {
                         var rsMin = $(this).data("min");
                         var rsMax = $(this).data("max");

                         $(this).rangeSlider({
                             bounds: { min: 1, max: 200 },
                             range: { min: 20, max: 40 },
                             defaultValues: { min: rsMin, max: rsMax }
                         });
                     });
                 } //End

                 //Range Slider with custom step
                 if ($(".stepSlider").length > 0) {
                     $(".stepSlider").each(function() {
                         var rsMin = $(this).data("min");
                         var rsMax = $(this).data("max");

                         $(this).rangeSlider({
                             bounds: { min: 1, max: 200 },
                             defaultValues: { min: rsMin, max: rsMax },
                             step: 10
                         });
                     });
                 } //End

             } //END RangeSlider

         //Start Knob Plugin
         var uiKnob = function() {

                 if ($(".knob").length > 0) {
                     $(".knob").knob();
                 }

             } //End Knob

         // Start Smart Wizard
         var uiSmartWizard = function() {

                 if ($(".wizard").length > 0) {

                     //Check count of steps in each wizard
                     $(".wizard > ul").each(function() {
                         $(this).addClass("steps_" + $(this).children("li").length);
                     }); //end

                     // This par of code used for example
                     if ($("#wizard-validation").length > 0) {

                         var validator = $("#wizard-validation").validate({
                             rules: {
                                 login: {
                                     required: true,
                                     minlength: 2,
                                     maxlength: 8
                                 },
                                 password: {
                                     required: true,
                                     minlength: 5,
                                     maxlength: 10
                                 },
                                 repassword: {
                                     required: true,
                                     minlength: 5,
                                     maxlength: 10,
                                     equalTo: "#password"
                                 },
                                 email: {
                                     required: true,
                                     email: true
                                 },
                                 name: {
                                     required: true,
                                     maxlength: 10
                                 },
                                 adress: {
                                     required: true
                                 }
                             }
                         });

                     } // End of example

                     $(".wizard").smartWizard({
                         // This part of code can be removed FROM
                         onLeaveStep: function(obj) {
                             var wizard = obj.parents(".wizard");

                             if (wizard.hasClass("wizard-validation")) {

                                 var valid = true;

                                 $('input,textarea', $(obj.attr("href"))).each(function(i, v) {
                                     valid = validator.element(v) && valid;
                                 });

                                 if (!valid) {
                                     wizard.find(".stepContainer").removeAttr("style");
                                     validator.focusInvalid();
                                     return false;
                                 }

                             }

                             return true;
                         }, // <-- TO

                         //This is important part of wizard init
                         onShowStep: function(obj) {
                                 var wizard = obj.parents(".wizard");

                                 if (wizard.hasClass("show-submit")) {

                                     var step_num = obj.attr('rel');
                                     var step_max = obj.parents(".anchor").find("li").length;

                                     if (step_num == step_max) {
                                         obj.parents(".wizard").find(".actionBar .btn-primary").css("display", "block");
                                     }
                                 }
                                 return true;
                             } //End
                     });
                 }

             } // End Smart Wizard

         //OWL Carousel
         var uiOwlCarousel = function() {

                 if ($(".owl-carousel").length > 0) {
                     $(".owl-carousel").owlCarousel({ mouseDrag: false, touchDrag: true, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false, autoPlay: true });
                 }

             } //End OWL Carousel

         // Summernote 
         var uiSummernote = function() {
                 /* Extended summernote editor */
                 if ($(".summernote").length > 0) {
                     $(".summernote").summernote({
                         height: 250,
                         codemirror: {
                             mode: 'text/html',
                             htmlMode: true,
                             lineNumbers: true,
                             theme: 'default'
                         }
                     });
                 }
                 /* END Extended summernote editor */

                 /* Lite summernote editor */
                 if ($(".summernote_lite").length > 0) {

                     $(".summernote_lite").on("focus", function() {

                         $(".summernote_lite").summernote({
                             height: 100,
                             focus: true,
                             toolbar: [
                                 ["style", ["bold", "italic", "underline", "clear"]],
                                 ["insert", ["link", "picture", "video"]]
                             ]
                         });
                     });
                 }
                 /* END Lite summernote editor */

                 /* Email summernote editor */
                 if ($(".summernote_email").length > 0) {

                     $(".summernote_email").summernote({
                         height: 400,
                         focus: true,
                         toolbar: [
                             ['style', ['bold', 'italic', 'underline', 'clear']],
                             ['font', ['strikethrough']],
                             ['fontsize', ['fontsize']],
                             ['color', ['color']],
                             ['para', ['ul', 'ol', 'paragraph']],
                             ['height', ['height']]
                         ]
                     });

                 }
                 /* END Email summernote editor */

             } // END Summernote 

         // Custom Content Scroller
         var uiScroller = function() {

                 if ($(".scroll").length > 0) {
                     $(".scroll").mCustomScrollbar({ axis: "y", autoHideScrollbar: true, scrollInertia: 20, advanced: { autoScrollOnFocus: false } });
                 }

             } // END Custom Content Scroller

         // Sparkline
         var uiSparkline = function() {

                 if ($(".sparkline").length > 0)
                     $(".sparkline").sparkline('html', { enableTagOptions: true, disableHiddenCheck: true });

             } // End sparkline              

         $(window).resize(function() {
             if ($(".owl-carousel").length > 0) {
                 $(".owl-carousel").data('owlCarousel').destroy();
                 uiOwlCarousel();
             }
         });

         return {
             init: function() {
                 uiDatatable();
                 uiRangeSlider();
                 uiKnob();
                 uiSmartWizard();
                 uiOwlCarousel();
                 uiSummernote();
                 uiScroller();
                 uiSparkline();
             }
         }

     }();

     var templatePlugins = function() {

         var tp_clock = function() {

             function tp_clock_time() {
                 var now = new Date();
                 var hour = now.getHours();
                 var minutes = now.getMinutes();

                 hour = hour < 10 ? '0' + hour : hour;
                 minutes = minutes < 10 ? '0' + minutes : minutes;

                 $(".plugin-clock").html(hour + "<span>:</span>" + minutes);
             }
             if ($(".plugin-clock").length > 0) {

                 tp_clock_time();

                 window.setInterval(function() {
                     tp_clock_time();
                 }, 10000);

             }
         }

         var tp_date = function() {

             if ($(".plugin-date").length > 0) {

                 var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                 var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                 var now = new Date();
                 var day = days[now.getDay()];
                 var date = now.getDate();
                 var month = months[now.getMonth()];
                 var year = now.getFullYear();

                 $(".plugin-date").html(day + ", " + month + " " + date + ", " + year);
             }

         }

         return {
             init: function() {
                 tp_clock();
                 tp_date();
             }
         }
     }();

     var fullCalendar = function() {

         var calendar = function() {

             if ($("#calendar").length > 0) {

                 function prepare_external_list() {

                     $('#external-events .external-event').each(function() {
                         var eventObject = { title: $.trim($(this).text()) };

                         $(this).data('eventObject', eventObject);
                         $(this).draggable({
                             zIndex: 999,
                             revert: true,
                             revertDuration: 0
                         });
                     });

                 }


                 var date = new Date();
                 var d = date.getDate();
                 var m = date.getMonth();
                 var y = date.getFullYear();

                 prepare_external_list();

                 var calendar = $('#calendar').fullCalendar({
                     header: {
                         left: 'prev,next today',
                         center: 'title',
                         right: 'month,agendaWeek,agendaDay'
                     },
                     editable: true,
                     eventSources: { url: "assets/ajax_fullcalendar.php" },
                     droppable: true,
                     selectable: true,
                     selectHelper: true,
                     select: function(start, end, allDay) {
                         var title = prompt('Event Title:');
                         if (title) {
                             calendar.fullCalendar('renderEvent', {
                                     title: title,
                                     start: start,
                                     end: end,
                                     allDay: allDay
                                 },
                                 true
                             );
                         }
                         calendar.fullCalendar('unselect');
                     },
                     drop: function(date, allDay) {

                         var originalEventObject = $(this).data('eventObject');

                         var copiedEventObject = $.extend({}, originalEventObject);

                         copiedEventObject.start = date;
                         copiedEventObject.allDay = allDay;

                         $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);


                         if ($('#drop-remove').is(':checked')) {
                             $(this).remove();
                         }

                     }
                 });

                 $("#new-event").on("click", function() {
                     var et = $("#new-event-text").val();
                     if (et != '') {
                         $("#external-events").prepend('<a class="list-group-item external-event">' + et + '</a>');
                         prepare_external_list();
                     }
                 });

             }
         }

         return {
             init: function() {
                 calendar();
             }
         }
     }();

     formElements.init();
     uiElements.init();
     templatePlugins.init();

     fullCalendar.init();

     /* My Custom Progressbar */
     $.mpb = function(action, options) {

             var settings = $.extend({
                 state: '',
                 value: [0, 0],
                 position: '',
                 speed: 20,
                 complete: null
             }, options);

             if (action == 'show' || action == 'update') {

                 if (action == 'show') {
                     $(".mpb").remove();
                     var mpb = '<div class="mpb ' + settings.position + '">\n\
                               <div class="mpb-progress' + (settings.state != '' ? ' mpb-' + settings.state : '') + '" style="width:' + settings.value[0] + '%;"></div>\n\
                           </div>';
                     $('body').append(mpb);
                 }

                 var i = $.isArray(settings.value) ? settings.value[0] : $(".mpb .mpb-progress").width();
                 var to = $.isArray(settings.value) ? settings.value[1] : settings.value;

                 var timer = setInterval(function() {
                     $(".mpb .mpb-progress").css('width', i + '%');
                     i++;

                     if (i > to) {
                         clearInterval(timer);
                         if ($.isFunction(settings.complete)) {
                             settings.complete.call(this);
                         }
                     }
                 }, settings.speed);

             }

             if (action == 'destroy') {
                 $(".mpb").remove();
             }

         }
         /* Eof My Custom Progressbar */


     // New selector case insensivity        
     $.expr[':'].containsi = function(a, i, m) {
         return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
     };
 });

 Object.size = function(obj) {
     var size = 0,
         key;
     for (key in obj) {
         if (obj.hasOwnProperty(key)) size++;
     }
     return size;
 };


 $(document).ready(function() {

     /* PROGGRESS START */
     $.mpb("show", { value: [0, 50], speed: 5 });
     /* END PROGGRESS START */

     var html_click_avail = true;

     $("html").on("click", function() {
         if (html_click_avail)
             $(".x-navigation-horizontal li,.x-navigation-minimized li").removeClass('active');
     });

     $(".x-navigation-horizontal .panel").on("click", function(e) {
         e.stopPropagation();
     });

     /* WIDGETS (DEMO)*/
     $(".widget-remove").on("click", function() {
         $(this).parents(".widget").fadeOut(400, function() {
             $(this).remove();
             $("body > .tooltip").remove();
         });
         return false;
     });
     /* END WIDGETS */

     /* Gallery Items */
     $(".gallery-item .iCheck-helper").on("click", function() {
         var wr = $(this).parent("div");
         if (wr.hasClass("checked")) {
             $(this).parents(".gallery-item").addClass("active");
         } else {
             $(this).parents(".gallery-item").removeClass("active");
         }
     });
     $(".gallery-item-remove").on("click", function() {
         $(this).parents(".gallery-item").fadeOut(400, function() {
             $(this).remove();
         });
         return false;
     });
     $("#gallery-toggle-items").on("click", function() {

         $(".gallery-item").each(function() {

             var wr = $(this).find(".iCheck-helper").parent("div");

             if (wr.hasClass("checked")) {
                 $(this).removeClass("active");
                 wr.removeClass("checked");
                 wr.find("input").prop("checked", false);
             } else {
                 $(this).addClass("active");
                 wr.addClass("checked");
                 wr.find("input").prop("checked", true);
             }

         });

     });
     /* END Gallery Items */

     // XN PANEL DRAGGING
     $(".xn-panel-dragging").draggable({
         containment: ".page-content",
         handle: ".panel-heading",
         scroll: false,
         start: function(event, ui) {
             html_click_avail = false;
             $(this).addClass("dragged");
         },
         stop: function(event, ui) {
             $(this).resizable({
                 maxHeight: 400,
                 maxWidth: 600,
                 minHeight: 200,
                 minWidth: 200,
                 helper: "resizable-helper",
                 start: function(event, ui) {
                     html_click_avail = false;
                 },
                 stop: function(event, ui) {
                     $(this).find(".panel-body").height(ui.size.height - 82);
                     $(this).find(".scroll").mCustomScrollbar("update");

                     setTimeout(function() {
                         html_click_avail = true;
                     }, 1000);

                 }
             })

             setTimeout(function() {
                 html_click_avail = true;
             }, 1000);
         }
     });
     // END XN PANEL DRAGGING

     /* DROPDOWN TOGGLE */
     $(".dropdown-toggle").on("click", function() {
         onresize();
     });
     /* DROPDOWN TOGGLE */

     /* MESSAGE BOX */
     $(".mb-control").on("click", function() {
         var box = $($(this).data("box"));
         if (box.length > 0) {
             box.toggleClass("open");

             var sound = box.data("sound");

             if (sound === 'alert')
                 playAudio('alert');

             if (sound === 'fail')
                 playAudio('fail');

         }
         return false;
     });
     $(".mb-control-close").on("click", function() {
         $(this).parents(".message-box").removeClass("open");
         return false;
     });
     /* END MESSAGE BOX */

     /* CONTENT FRAME */
     $(".content-frame-left-toggle").on("click", function() {
         $(".content-frame-left").is(":visible") ? $(".content-frame-left").hide() : $(".content-frame-left").show();
         page_content_onresize();
     });
     $(".content-frame-right-toggle").on("click", function() {
         $(".content-frame-right").is(":visible") ? $(".content-frame-right").hide() : $(".content-frame-right").show();
         page_content_onresize();
     });
     /* END CONTENT FRAME */

     /* MAILBOX */
     $(".mail .mail-star").on("click", function() {
         $(this).toggleClass("starred");
     });

     $(".mail-checkall .iCheck-helper").on("click", function() {

         var prop = $(this).prev("input").prop("checked");

         $(".mail .mail-item").each(function() {
             var cl = $(this).find(".mail-checkbox > div");
             cl.toggleClass("checked", prop).find("input").prop("checked", prop);
         });

     });
     /* END MAILBOX */

     /* PANELS */

     $(".panel-fullscreen").on("click", function() {
         panel_fullscreen($(this).parents(".panel"));
         return false;
     });

     $(".panel-collapse").on("click", function() {
         panel_collapse($(this).parents(".panel"));
         $(this).parents(".dropdown").removeClass("open");
         return false;
     });
     $(".panel-remove").on("click", function() {
         panel_remove($(this).parents(".panel"));
         $(this).parents(".dropdown").removeClass("open");
         return false;
     });
     $(".panel-refresh").on("click", function() {
         var panel = $(this).parents(".panel");
         panel_refresh(panel);

         setTimeout(function() {
             panel_refresh(panel);
         }, 3000);

         $(this).parents(".dropdown").removeClass("open");
         return false;
     });
     /* EOF PANELS */

     /* ACCORDION */
     $(".accordion .panel-title a").on("click", function() {

         var blockOpen = $(this).attr("href");
         var accordion = $(this).parents(".accordion");
         var noCollapse = accordion.hasClass("accordion-dc");


         if ($(blockOpen).length > 0) {

             if ($(blockOpen).hasClass("panel-body-open")) {
                 $(blockOpen).slideUp(200, function() {
                     $(this).removeClass("panel-body-open");
                 });
             } else {
                 $(blockOpen).slideDown(200, function() {
                     $(this).addClass("panel-body-open");
                 });
             }

             if (!noCollapse) {
                 accordion.find(".panel-body-open").not(blockOpen).slideUp(200, function() {
                     $(this).removeClass("panel-body-open");
                 });
             }

             return false;
         }

     });
     /* EOF ACCORDION */

     /* DATATABLES/CONTENT HEIGHT FIX */
     $(".dataTables_length select").on("change", function() {
         onresize();
     });
     /* END DATATABLES/CONTENT HEIGHT FIX */

     /* TOGGLE FUNCTION */
     $(".toggle").on("click", function() {
         var elm = $("#" + $(this).data("toggle"));
         if (elm.is(":visible"))
             elm.addClass("hidden").removeClass("show");
         else
             elm.addClass("show").removeClass("hidden");

         return false;
     });
     /* END TOGGLE FUNCTION */

     /* MESSAGES LOADING */
     $(".messages .item").each(function(index) {
         var elm = $(this);
         setInterval(function() {
             elm.addClass("item-visible");
         }, index * 300);
     });
     /* END MESSAGES LOADING */

     x_navigation();
 });

 $(function() {
     onload();

     /* PROGGRESS COMPLETE */
     $.mpb("update", {
         value: 100,
         speed: 5,
         complete: function() {
             $(".mpb").fadeOut(200, function() {
                 $(this).remove();
             });
         }
     });
     /* END PROGGRESS COMPLETE */
 });

 $(window).resize(function() {
     x_navigation_onresize();
     page_content_onresize();
 });

 function onload() {
     x_navigation_onresize();
     page_content_onresize();
 }

 function page_content_onresize() {
     $(".page-content,.content-frame-body,.content-frame-right,.content-frame-left").css("width", "").css("height", "");

     var content_minus = 0;
     content_minus = ($(".page-container-boxed").length > 0) ? 40 : content_minus;
     content_minus += ($(".page-navigation-top-fixed").length > 0) ? 50 : 0;

     var content = $(".page-content");
     var sidebar = $(".page-sidebar");

     if (content.height() < $(document).height() - content_minus) {
         content.height($(document).height() - content_minus);
     }

     if (sidebar.height() > content.height()) {
         content.height(sidebar.height());
     }

     if ($(window).width() > 1024) {

         if ($(".page-sidebar").hasClass("scroll")) {
             if ($("body").hasClass("page-container-boxed")) {
                 var doc_height = $(document).height() - 40;
             } else {
                 var doc_height = $(window).height();
             }
             $(".page-sidebar").height(doc_height);

         }

         if ($(".content-frame-body").height() < $(document).height() - 162) {
             $(".content-frame-body,.content-frame-right,.content-frame-left").height($(document).height() - 162);
         } else {
             $(".content-frame-right,.content-frame-left").height($(".content-frame-body").height());
         }

         $(".content-frame-left").show();
         $(".content-frame-right").show();
     } else {
         $(".content-frame-body").height($(".content-frame").height() - 80);

         if ($(".page-sidebar").hasClass("scroll"))
             $(".page-sidebar").css("height", "");
     }

     if ($(window).width() < 1200) {
         if ($("body").hasClass("page-container-boxed")) {
             $("body").removeClass("page-container-boxed").data("boxed", "1");
         }
     } else {
         if ($("body").data("boxed") === "1") {
             $("body").addClass("page-container-boxed").data("boxed", "");
         }
     }
 }

 /* PANEL FUNCTIONS */
 function panel_fullscreen(panel) {

     if (panel.hasClass("panel-fullscreened")) {
         panel.removeClass("panel-fullscreened").unwrap();
         panel.find(".panel-body,.chart-holder").css("height", "");
         panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");

         $(window).resize();
     } else {
         var head = panel.find(".panel-heading");
         var body = panel.find(".panel-body");
         var footer = panel.find(".panel-footer");
         var hplus = 30;

         if (body.hasClass("panel-body-table") || body.hasClass("padding-0")) {
             hplus = 0;
         }
         if (head.length > 0) {
             hplus += head.height() + 21;
         }
         if (footer.length > 0) {
             hplus += footer.height() + 21;
         }

         panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);


         panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');
         panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");

         $(window).resize();
     }
 }

 function panel_collapse(panel, action, callback) {

     if (panel.hasClass("panel-toggled")) {
         panel.removeClass("panel-toggled");

         panel.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");

         if (action && action === "shown" && typeof callback === "function")
             callback();

         onload();

     } else {
         panel.addClass("panel-toggled");

         panel.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");

         if (action && action === "hidden" && typeof callback === "function")
             callback();

         onload();

     }
 }

 function panel_refresh(panel, action, callback) {
     if (!panel.hasClass("panel-refreshing")) {
         panel.append('<div class="panel-refresh-layer"><img src="img/loaders/default.gif"/></div>');
         panel.find(".panel-refresh-layer").width(panel.width()).height(panel.height());
         panel.addClass("panel-refreshing");

         if (action && action === "shown" && typeof callback === "function")
             callback();
     } else {
         panel.find(".panel-refresh-layer").remove();
         panel.removeClass("panel-refreshing");

         if (action && action === "hidden" && typeof callback === "function")
             callback();
     }
     onload();
 }

 function panel_remove(panel, action, callback) {
     if (action && action === "before" && typeof callback === "function")
         callback();

     panel.animate({ 'opacity': 0 }, 200, function() {
         panel.parent(".panel-fullscreen-wrap").remove();
         $(this).remove();
         if (action && action === "after" && typeof callback === "function")
             callback();


         onload();
     });
 }
 /* EOF PANEL FUNCTIONS */

 /* X-NAVIGATION CONTROL FUNCTIONS */
 function x_navigation_onresize() {

     var inner_port = window.innerWidth || $(document).width();

     if (inner_port < 1025) {
         $(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
         $(".page-container").removeClass("page-container-wide");
         $(".page-sidebar .x-navigation li.active").removeClass("active");


         $(".x-navigation-horizontal").each(function() {
             if (!$(this).hasClass("x-navigation-panel")) {
                 $(".x-navigation-horizontal").addClass("x-navigation-h-holder").removeClass("x-navigation-horizontal");
             }
         });


     } else {
         if ($(".page-navigation-toggled").length > 0) {
             x_navigation_minimize("close");
         }

         $(".x-navigation-h-holder").addClass("x-navigation-horizontal").removeClass("x-navigation-h-holder");
     }

 }

 function x_navigation_minimize(action) {

     if (action == 'open') {
         $(".page-container").removeClass("page-container-wide");
         $(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
         $(".x-navigation-minimize").find(".fa").removeClass("fa-indent").addClass("fa-dedent");
         $(".page-sidebar.scroll").mCustomScrollbar("update");
     }

     if (action == 'close') {
         $(".page-container").addClass("page-container-wide");
         $(".page-sidebar .x-navigation").addClass("x-navigation-minimized");
         $(".x-navigation-minimize").find(".fa").removeClass("fa-dedent").addClass("fa-indent");
         $(".page-sidebar.scroll").mCustomScrollbar("disable", true);
     }

     $(".x-navigation li.active").removeClass("active");

 }

 function x_navigation() {

     $(".x-navigation-control").click(function() {
         $(this).parents(".x-navigation").toggleClass("x-navigation-open");

         onresize();

         return false;
     });

     if ($(".page-navigation-toggled").length > 0) {
         x_navigation_minimize("close");
     }

     $(".x-navigation-minimize").click(function() {

         if ($(".page-sidebar .x-navigation").hasClass("x-navigation-minimized")) {
             $(".page-container").removeClass("page-navigation-toggled");
             x_navigation_minimize("open");
         } else {
             $(".page-container").addClass("page-navigation-toggled");
             x_navigation_minimize("close");
         }

         onresize();

         return false;
     });

     $(".x-navigation  li > a").click(function() {

         var li = $(this).parent('li');
         var ul = li.parent("ul");

         ul.find(" > li").not(li).removeClass("active");

     });

     $(".x-navigation li").click(function(event) {
         event.stopPropagation();

         var li = $(this);

         if (li.children("ul").length > 0 || li.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0) {
             if (li.hasClass("active")) {
                 li.removeClass("active");
                 li.find("li.active").removeClass("active");
             } else
                 li.addClass("active");

             onresize();

             if ($(this).hasClass("xn-profile") > 0)
                 return true;
             else
                 return false;
         }
     });

     /* XN-SEARCH */
     $(".xn-search").on("click", function() {
             $(this).find("input").focus();
         })
         /* END XN-SEARCH */

 }
 /* EOF X-NAVIGATION CONTROL FUNCTIONS */

 /* PAGE ON RESIZE WITH TIMEOUT */
 function onresize(timeout) {
     timeout = timeout ? timeout : 200;

     setTimeout(function() {
         page_content_onresize();
     }, timeout);
 }
 /* EOF PAGE ON RESIZE WITH TIMEOUT */

 /* PLAY SOUND FUNCTION */
 function playAudio(file) {
     if (file === 'alert')
         document.getElementById('audio-alert').play();

     if (file === 'fail')
         document.getElementById('audio-fail').play();
 }
 /* END PLAY SOUND FUNCTION */

 /* NEW OBJECT(GET SIZE OF ARRAY) */
 Object.size = function(obj) {
     var size = 0,
         key;
     for (key in obj) {
         if (obj.hasOwnProperty(key)) size++;
     }
     return size;
 };
