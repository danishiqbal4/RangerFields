$(document).ready(function(){

    if($("#range_slider")){
        var $rangeSlider = $("#range_slider").ionRangeSlider({
            skin: 'round',
            type: 'double',
            grid: true,
            grid_snap: true,
            min: 0,
            max: 10,
            from: 1,
            to: 7.5,
            step: 0.25,
            postfix: ' min',
            extra_classes: 'ranger-range-slider',
            onChange: function (data) {
                $('#range_slider').siblings('.call-duration-from').val(data['from_pretty']);
                $('#range_slider').siblings('.call-duration-to').val(data['to_pretty']);
            },
        });

        var rangeSlider_instance = $rangeSlider.data("ionRangeSlider");
    }

    $('body').click(function(){

        $('.af-options').addClass('hidden');

    });

    //Code for checkbox clicks
    $('.check-container li').on('click',function(e){
        e.stopPropagation();
        $(this).find('input')[0].click();
    });

    $('.custcheck').on('click',function(e){
        e.stopPropagation();
        $(this).parent().toggleClass('text-white bg-purple-light');

        if($(this).is(':checked')){
            $(this).parent().parent().addClass('bg-white');
        } else {
            $(this).parent().parent().removeClass('bg-white');

            $(this).closest('.fcard-body').find('.cf-check-all').prop('checked', false);
            $(this).closest('.fcard-body').find('.cf-check-all').parent().removeClass('text-white bg-purple-light');
        }

        //**********************************************************************//
        //Function below will reset the number of options selected//
        calculateTotalSelectedCheckbox(this);
        
    });

    //****************************//
    //Code for filter Cards STARTS//
    //****************************//
    $('.svg-cont').click(function(e){
        e.stopPropagation();
        $(this).children().toggleClass('rotate-180');
        $(this).closest('.fcard-body').children('.fc-options').toggleClass('hidden');

        if($(this).closest('.fcard-body').children('.fc-options').hasClass('hidden')){
            $(this).closest('.fcard-body').find('.fcard-search-box').val('');
            $(this).closest('.fcard-body').find('.fcard-search-box').keyup();
        }
    });

    $('.filter-card').click(function(e){
        e.stopPropagation();

        $(this).find('.fc-options').addClass('hidden');
        $(this).find('.fcard-search-box').val('');
        $(this).find('.fcard-search-box').keyup();
        $(this).find('.svg-cont').children().removeClass('rotate-180');
    });

    $('body').click(function(e){
        $('.fc-options').addClass('hidden');
        $('.fcard-search-box').val('');
        $('.fcard-search-box').keyup();
        $('.svg-cont').children().removeClass('rotate-180');
    });

    $('.fcard-search-box').click(function(e){
        e.stopPropagation();

        $(this).parent().siblings('.fc-options').removeClass('hidden');
        $(this).siblings('.svg-cont').children().addClass('rotate-180');
    });

    $('.fcard-search-box').on('keyup', function(e){
        e.stopPropagation();
        let searchQuery = $(this).val().trim().toLowerCase();

        let $li = $(this).parent().siblings('.fc-options').find('li');
        
        $li.each(function(){
            let label = $(this).children('label').text().toLowerCase();
            
            if(label.includes(searchQuery)){
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });

        let temp = true;
        if(searchQuery !== ''){
            //if search box is not empty
            $li = $(this).closest('.fc-input').siblings('.fc-options').find('li:visible');

            //if search query is not matching any option
            if($li.length < 1){

                $li = $(this).closest('.fc-input').siblings('.fc-options').find('li');

            }
        }

        $li.each(function(){
            if($(this).find('input').is(":checked")){
                temp = true;
            } else {
                temp = false;
                return false;
            }
        });

        if(temp){
            $(this).siblings().children('.cf-check-all').prop('checked', true);
            $(this).siblings().children('.cf-check-all').parent().addClass('text-white bg-purple-light');
        } else {
            $(this).siblings().children('.cf-check-all').prop('checked', false);
            $(this).siblings().children('.cf-check-all').parent().removeClass('text-white bg-purple-light');
        }

    });

    $('.cf-check-all').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass('text-white bg-purple-light');

        let searchQuery = $(this).parent().siblings('.fcard-search-box').val().trim();

        let $li = null;
        if(searchQuery !== ''){
            //if there is text in the search box
            $li = $(this).closest('.fc-input').siblings('.fc-options').find('li:visible');
            
        } else {
            //if there is NO text in the search box
            $li = $(this).closest('.fc-input').siblings('.fc-options').find('li');

        }

        if($(this).is(":checked")){
            $li.each(function(){
                if($(this).find('input').is(":not(:checked)")){
                    $(this).find('input').click();
                }
            });
        } else {
            $li.each(function(){
                if($(this).find('input').is(":checked")){
                    $(this).find('input').click();
                }
            });                    
        }

    });

    //Object to store the previous state of checked options in a filter
    //It will be filled when the filter Edit button is pressed
    var checkArr = {};

    $('.fcard-close').click(function(e){
        e.stopPropagation();

        let ID = $(this).closest('.filter-boxes').attr('id');

        let dataFilter = $(this).closest('.filter-boxes').data('filter');

        if(dataFilter){
            //when card is open due to edit filter icon

            $(this).closest('.filter-card').addClass('hidden');

            if(checkArr['check_list']){

                if(ID === 'filter-box-date'){

                    for(i=0; i<checkArr['check_list'].length; i++){
                        $(this).closest('.filter-card').find('.fc-input input:eq('+[i]+')').val(checkArr['check_list'][i]);
                    }
                    
                } else if(ID === 'filter-box-callduration'){

                    for(i=0; i<checkArr['check_list'].length; i++){
                        $(this).closest('.filter-card').find('.fc-input .call-duration-input:eq('+[i]+')').val(checkArr['check_list'][i]);
                    }

                    resetRangeSlider(checkArr['check_list'][0], checkArr['check_list'][1]);
                    
                } else {

                    if(!$(this).closest('.filter-card').find('.fc-options').hasClass('hidden')){
                        $(this).closest('.filter-card').find('.svg-cont').click();                    
                    }

                    for(i=0; i<checkArr['check_list'].length; i++){

                        let $li = $(this).closest('.filter-card').find('.fc-options li:eq('+[i]+')');

                        if(checkArr['check_list'][i]){
                            $li.find('.custcheck').prop('checked', true);
                            $li.find('.custcheck').parent().addClass('text-white bg-purple-light');
                            $li.addClass('bg-white');
                        } else {
                            $li.find('.custcheck').prop('checked', false);
                            $li.find('.custcheck').parent().removeClass('text-white bg-purple-light');
                            $li.removeClass('bg-white');
                        }
                    }

                    if(checkArr['check_all']){
                        $(this).closest('.filter-card').find('.cf-check-all').prop('checked', true);
                        $(this).closest('.filter-card').find('.cf-check-all').parent().addClass('text-white bg-purple-light');
                    } else {
                        $(this).closest('.filter-card').find('.cf-check-all').prop('checked', false);
                        $(this).closest('.filter-card').find('.cf-check-all').parent().removeClass('text-white bg-purple-light');
                    }

                }
            }

        } else {
            //when card is open due to add filter button

            if(ID === 'filter-box-date'){

                $(this).closest('.filter-card').find('.fc-input input').val('');

            } else {

                $(this).closest('.filter-card').find('.cf-check-all').prop('checked', false);
                $(this).closest('.filter-card').find('.cf-check-all').parent().removeClass('text-white bg-purple-light');
                
                $(this).closest('.filter-card').find('.fc-options li').removeClass('bg-white');
                $(this).closest('.filter-card').find('.fc-options li > div').removeClass('text-white bg-purple-light');
                $(this).closest('.filter-card').find('.fc-options .custcheck').prop('checked', false);
                $(this).closest('.filter-card').find('.fc-options').addClass('hidden');

            }
            
            $(this).closest('.filter-boxes').addClass('hidden');
            $(this).closest('.filter-card').find('.svg-cont svg').removeClass('rotate-180');
            
        }

        calculateTotalSelectedCheckbox(this);

    });

    //variable to set order of filter divs while adding filter
    var globalBoxOrder = 0;

    $('.fc-apply').click(function(e){
        e.stopPropagation();

        let ID = $(this).closest('.filter-boxes').attr('id');

        if(ID === 'filter-box-date'){

            let temp = 0;
            $(this).closest('.filter-card').find('.fc-input input').each(function(){
                if($(this).val().trim() !== ''){
                    temp++;
                    return false;
                }
            });

            if(temp < 1){
                alert('Please set atleast one date!');
                return false;
            }

        } else if(ID === 'filter-box-callduration'){

            let temp = 0;
            $(this).closest('.filter-card').find('.fc-input .call-duration-input').each(function(){
                if($(this).val().trim() !== ''){
                    temp++;
                    return false;
                }
            });

            if(temp < 1){
                alert('Please drag the sliders at least once!');
                return false;
            }

        } else{

            let temp = 0;
            $(this).closest('.filter-card').find('.fc-options li').each(function(){
                if($(this).find('.custcheck').is(':checked')){
                    temp++;
                    return false;
                }
            });

            if(temp < 1){
                alert('Please check at least 1 option for the filter to work');
                return false;
            }

        }

        let dataFilter = $(this).closest('.filter-boxes').data('filter');
        if(dataFilter){
            
            $(this).closest('.filter-boxes').children('.filter-card').addClass('hidden');

        } else{
            
            $(this).closest('.filter-boxes').children('.filter-pill').removeClass('hidden');
            $(this).closest('.filter-boxes').children('.filter-card').addClass('hidden');
            
            $(this).closest('.filter-boxes').removeClass('order-last').css('order', globalBoxOrder);
            globalBoxOrder++;

            $(this).closest('.filter-boxes').data('filter', true);

            let hiddenFilters = false;
            $('.af-options li').each(function(){
                let liID = $(this).data('id');

                if(ID === liID){
                    $(this).addClass('hidden');
                }

                if(!$(this).hasClass('hidden')){
                    hiddenFilters = true;
                }
            });

            if(!hiddenFilters){
                $('.add-filter-wrap').addClass('hidden');
            }

        } 

        //**********************************************************************//
        //Function below will reset the number of options selected//

        calculateTotalSelectedCheckbox(this);

        //**********************************************************************//
        //Function below that will collect all the selected data of every filter//
        
        collectFilterData();


    });

    //**************************//
    //Code for filter Cards ENDS//
    //**************************//



    //****************************************//
    //Code for Adding/modifying filters STARTS//
    //****************************************//
    $('.af-btn').click(function(e){
        e.stopPropagation();
        
        closeOpenFilterBoxes();

        $(this).siblings('.af-options').toggleClass('hidden');
    });

    $('.af-options li').click(function(e){
        e.stopPropagation();

        $(this).parent().addClass('hidden');

        let filterBoxID = '#'+$(this).data('id');
        $(filterBoxID).removeClass('hidden');
    });

    $('.fp-remove').click(function(e){
        e.stopPropagation();

        closeOpenFilterBoxes();

        $(this).closest('.filter-boxes').find('.fc-options input[type=checkbox]').prop('checked', false);
        $(this).closest('.filter-boxes').find('.cf-check-all').prop('checked', false);
        $(this).closest('.filter-boxes').find('.cf-check-all').parent().removeClass('text-white bg-purple-light');

        $(this).closest('.filter-boxes').find('.fc-options li').removeClass('bg-white');
        $(this).closest('.filter-boxes').find('.fc-options li > div').removeClass('text-white bg-purple-light');

        $(this).closest('.filter-boxes').addClass('hidden');
        $(this).closest('.filter-boxes').children('.filter-card').removeClass('hidden');
        $(this).closest('.filter-boxes').children('.filter-card').removeClass('top-10');
        $(this).closest('.filter-pill').addClass('hidden');

        $(this).closest('.filter-boxes').css('order', '').addClass('order-last');

        $(this).closest('.filter-boxes').data('filter', false);

        let ID = $(this).closest('.filter-boxes').attr('id');

        if(ID === 'filter-box-date'){
            $(this).closest('.filter-boxes').find('.fc-input input').val('');
        } else if(ID === 'filter-box-callduration') {
            $(this).closest('.filter-boxes').find('.fc-input .call-duration-input').val('');

            resetRangeSlider(1, 7.5);
        }

        let hiddenFilters = false;
        $('.af-options li').each(function(){
            let liID = $(this).data('id');

            if(ID === liID){
                $(this).removeClass('hidden');
            }

            if(!$(this).hasClass('hidden')){
                hiddenFilters = true;
            }
        });

        if(hiddenFilters){
            $('.add-filter-wrap').removeClass('hidden');
        }

        $(this).closest('.filter-boxes').children('.filter-card').css('left', '');


        //**********************************************************************//
        //Function below will reset the number of options selected//

        calculateTotalSelectedCheckbox(this);

        //**********************************************************************//
        //Function below that will collect all the selected data of every filter//
        
        collectFilterData();

    });

    function closeOpenFilterBoxes(){
        $('.filter-boxes').each(function(){
            if(!$(this).children('.filter-card').hasClass('hidden')){
                $(this).find('.fcard-close').click();
            }
        });
    }

    $('.fp-edit').click(function(e){
        e.stopPropagation();

        closeOpenFilterBoxes();

        checkArr = {};
        let check_list = [];

        let ID = $(this).closest('.filter-boxes').attr('id');

        if(ID === 'filter-box-date'){
            //If filter is for Date

            $(this).closest('.filter-boxes').find('.fc-input input').each(function(){
                check_list.push($(this).val().trim());
            });

            checkArr['check_list'] = check_list;

        } else if(ID === 'filter-box-callduration'){
            //If filter is for Call Duration

            $(this).closest('.filter-boxes').find('.fc-input .call-duration-input').each(function(){
                check_list.push($(this).val().trim());
            });

            checkArr['check_list'] = check_list;

        } else {
        
            $(this).closest('.filter-boxes').find('.fc-options li').each(function(index){
                let flag = $(this).find('.custcheck').is(':checked');
                check_list[index]=flag;
            });

            checkArr['check_list'] = check_list;
            
            if($(this).closest('.filter-boxes').find('.cf-check-all').is(':checked')){
                checkArr['check_all'] = true;
            }

        }

        let filterPillWidth = 160;
        let filterCardWidth = $(this).closest('.filter-boxes').children('.filter-card').width();
        let leftMove = (filterCardWidth - filterPillWidth) / 2;
        leftMove = '-'+leftMove+'px';

        $(this).closest('.filter-boxes').children('.filter-card').css('left', leftMove);
        $(this).closest('.filter-boxes').children('.filter-card').addClass('top-10');
        $(this).closest('.filter-boxes').children('.filter-card').removeClass('hidden');
    });
    //****************************//
    //CODE FOR ADDING FILTERS ENDS//
    //****************************//


    //********************************//
    //Function FOR slider reset starts//
    //********************************//

    function resetRangeSlider(from, to){
        rangeSlider_instance.update({
            skin: 'round',
            type: 'double',
            grid: true,
            grid_snap: true,
            min: 0,
            max: 10,
            from: from,
            to: to,
            step: 0.5,
            postfix: ' min',
            extra_classes: 'ranger-range-slider',
            onChange: function (data) {
                $('#range_slider').siblings('.call-duration-from').val(data['from_pretty']);
                $('#range_slider').siblings('.call-duration-to').val(data['to_pretty']);
            },
        });
    }

    //******************************//
    //Function FOR slider reset ends//
    //******************************//


    //******************************************//
    //FUNCTION FOR SHOWING NUMBER OF SELECTED OPTIONS STARTS//
    //******************************************//
    function calculateTotalSelectedCheckbox(clickedElement){

        let temp = 0;
        const totalCheckboxes = $(clickedElement).closest('.filter-boxes').find('.check-container .custcheck');

        totalCheckboxes.each(function(){
            if($(this).is(':checked')){
                temp++;
            }
        });

        $(clickedElement).closest('.filter-boxes').find('.fcard-options-sel-total').text(temp);

    }

    //******************************************//
    //FUNCTION FOR COLLECTING FILTER DATA STARTS//
    //******************************************//

    function collectFilterData(){
        //Loop through all the checkboxes, date textboxes and call duration textboxes to collect the filter data
        //Fires on card Apply button click and filter remove icon click

        let checkboxArr = {};

        const $campaignSelectedCheckboxes = $('.filter-box-wrap').find('input[name="campaign"]:checked');
        const $agentSelectedCheckboxes = $('.filter-box-wrap').find('input[name="agent"]:checked');
        const $ratingSelectedCheckboxes = $('.filter-box-wrap').find('input[name="rating"]:checked');
        const $emailSelectedCheckboxes = $('.filter-box-wrap').find('input[name="email"]:checked');

        if($campaignSelectedCheckboxes.length > 0){
            let campaignArr = [];
            $campaignSelectedCheckboxes.each(function(){
                campaignArr.push($(this).attr('value'));
            });

            checkboxArr['campaign'] = campaignArr;
        }

        if($agentSelectedCheckboxes.length > 0){
            let agentArr = [];
            $agentSelectedCheckboxes.each(function(){
                agentArr.push($(this).attr('value'));
            });

            checkboxArr['agent'] = agentArr;
        }

        if($ratingSelectedCheckboxes.length > 0){
            let ratingArr = [];
            $ratingSelectedCheckboxes.each(function(){
                ratingArr.push($(this).attr('value'));
            });

            checkboxArr['rating'] = ratingArr;
        }

        if($emailSelectedCheckboxes.length > 0){
            let emailArr = [];
            $emailSelectedCheckboxes.each(function(){
                emailArr.push($(this).attr('value'));
            });

            checkboxArr['email'] = emailArr;
        }

        const date_start = $('.filter-box-wrap').find('input[name="start_date"]').val();
        const date_end = $('.filter-box-wrap').find('input[name="end_date"]').val();

        if(date_start != '' || date_end != ''){
            checkboxArr['date'] = [date_start, date_end];
        }


        const call_duration_from = $('.filter-box-wrap').find('.call-duration-from').val();
        const call_duration_to = $('.filter-box-wrap').find('.call-duration-to').val();

        if(call_duration_from != '' && call_duration_to != ''){
            checkboxArr['call_duration'] = [call_duration_from, call_duration_to];
        }

    
        console.log(checkboxArr);

        checkboxArr = JSON.stringify(checkboxArr);

        console.log(checkboxArr);

    }

    //****************************************//
    //FUNCTION FOR COLLECTING FILTER DATA ENDS//
    //****************************************// 

});