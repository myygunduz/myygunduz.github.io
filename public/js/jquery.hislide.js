(function($) {
    var slide = function(ele,options) {
        var $ele = $(ele);
        var activePageIndex = 2;
        var setting = {
            speed: 1000,
            interval: 2000,
            
        };
        $.extend(true, setting, options);
        var states = [
            { $zIndex: 2, width: '80%', height: '80%', top: '50%', left: '40%', $opacity: 0.4 ,transform: 'translate(-50%,-50%)'},
            { $zIndex: 3, width: '85%', height: '85%', top: '50%', left: '45%', $opacity: 0.7 ,transform: 'translate(-50%,-50%)'},
            { $zIndex: 4, width: '90%', height: '90%', top: '50%', left: '50%', $opacity: 1   ,transform: 'translate(-50%,-50%)'},
            { $zIndex: 3, width: '85%', height: '85%', top: '50%', left: '55%', $opacity: 0.7 ,transform: 'translate(-50%,-50%)'},
            { $zIndex: 2, width: '80%', height: '80%', top: '50%', left: '60%', $opacity: 0.4 ,transform: 'translate(-50%,-50%)'}
        ];
        var $lis = $ele.find('li');

        $ele.find('.hi-next').on('click', function() {
            activePageIndex++;
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            activePageIndex--;
            states.push(states.shift());
            move();
        });
        /*for nav bar */
        $('#navbar').find('a').on('click', function() {
            var index = $(this).index();
            if (index < activePageIndex) {
                var x = activePageIndex - index;
                activePageIndex = index;
                for (var i = 0; i < x; i++) {
                    states.push(states.shift());
                    move();
                }
            }
            else if (index > activePageIndex) {
                var x = index - activePageIndex;
                activePageIndex = index;
                for (var i = 0; i < x; i++) {
                    states.unshift(states.pop());
                    move();
                }
            }else{
                return 
            }
        });
        $('#about_me_button').on('click', function() {
            activePageIndex--;
            states.push(states.shift());
            activePageIndex--;
            states.push(states.shift());
            move();
        });
        $('#contact_me_button').on('click', function() {
            activePageIndex--;
            states.push(states.shift());
            move();
        });

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, '0.5s').find('div').css('opacity', state.$opacity);
                //add transform
                $(element).css('transform', state.transform);
                $(element).css('transition', 'all 1s');
            });
        }

        function next() {
            states.unshift(states.pop());
            move();
        }
        move();
    }
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        return this;
        
    }
})(jQuery);


