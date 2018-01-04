   var GridOverlay = (function() {

      var gridContentOpener = $('.gridoverlay__content--opener'),
          gridContentCloser = $('.gridoverlay__content--closer'),
          gridWrap = $('.gridoverlay__wrapper'),
          grid = $('.gridoverlay'),
          // self,
          // gridItemBack,
          // placeholder,
          resizeTimeout,
          // doNothing,
          isAnimating;
          //support = support.pointerevents && support.csstransitions && support.csstransforms3d;


      //window resize
      $(window).on( 'resize', function() { resizeHandler(); console.log('resize')} );
      // trick to prevent scrolling when animation is running (opening only)
      // this prevents that the back of the placeholder does not stay positioned in a wrong way
      $(window).on('scroll', function() {
        if ( isAnimating ) {
          $(window).scrollTo( gridItem.scrollPosition ? gridItem.scrollPosition.x : 0, gridItem.scrollPosition ? gridItem.scrollPosition.y : 0 );
        } else {
          gridItem.scrollPosition = { x : $(window).width() || $(document).scrollLeft(), y : $(window).height() || $(document).scrollTop() };
          // change the grid perspective origin as we scroll the page
          scrollHandler();
        }
      });


    //show
    var showContent = function(event) {
      event.stopPropagation();
      if( isAnimating ) {
          return false;
       }
      isAnimating = true;
      //init
      self = $(this);
      gridItem = self.parents('.gridoverlay__item');
      itemPosition = gridItem.position();
      gridItemBack = gridItem.find('[class$="item__back"]');
      gridItemID = gridItem.attr('id');
      itemSize = { width : gridItemBack.outerWidth(), height : gridItemBack.outerHeight() };
      content = $(document).find('.gridoverlay__content[data-content-for="' + gridItemID + '"]');
      contentItems = content.children('div');
      loader = content.find( 'span.spinner--loading' );

      if ( content.length ){
        createPlaceholder();
        setTimeout( animFn, 25 );
      }
      isAnimating = false;
      };

    //hide
    var hideContent = function(event) {
      //event.stopPropagation();
      var placeholder = $('.placeholder');
      contentItems.removeClass( 'show' );
      content.removeClass( 'show' );
      // without the timeout there seems to be some problem in firefox
      setTimeout( function() { $( 'body' ).removeClass( 'noscroll' ); }, 25 );
      //reset placeholder style values
      placeholder.css('top', itemPosition.top + 'px');
      placeholder.css('left', itemPosition.left + 'px');
      placeholder.css(itemSize);
      //remove class an turn placeholder back
      gridWrap.removeClass( 'view-full' );

      var transitionEvent = whichTransitionEvent();
        $('.placeholder').one(transitionEvent, function(event) {
          $('.placeholder').remove();
          gridItem.removeClass( 'active' );
        });
    };

    //load Content
    var loadContent = function() {
      // simulating loading...
      setTimeout( function() {
        // hide loader
        loader.removeClass( 'show' );
        contentItems.addClass('show');
      }, 1000 );
      // show content area
      content.addClass( 'show' );
      // show loader
      loader.addClass( 'show' );
      $('body').addClass( 'noscroll' );
    };

    //creat placeholder
    var createPlaceholder = function () {
        console.log('creating placeholder');
      // set the top and left of the placeholder to the top and left of the clicked grid item
      if(!$('.placeholder').length) {
        var frontSite = document.createElement( '<div></div>' );
    		frontSite.className = 'placeholder__front';
    		frontSite.innerHTML = gridItemBack.html();

        var backSite = document.createElement( 'div' );
    		backSite.className = 'placeholder__back';
    		backSite.innerHTML = '&nbsp;';

        var placeholder = document.createElement( 'article' );
    		placeholder.className = 'placeholder';
    		placeholder.append( frontSite );
    		placeholder.append( backSite );
        //add to dom
        grid.append( placeholder );
        //add position
        $('.placeholder').css('top', itemPosition.top + 'px');
        $('.placeholder').css('left', itemPosition.left + 'px');
        $('.placeholder').css( itemSize );
      }
    };

    // and animate placeholder
    var animFn = function() {
      // give class "active" to current grid item (hides it)
      gridItem.addClass( 'active' );
      // add class "view-full" to the grid-wrap
      gridWrap.addClass( 'view-full' );
      // set width/height/left/top of placeholder
      resizePlaceholder();
      var transitionEvent = whichTransitionEvent();
        placeholder.one(transitionEvent,  function(event) {
        loadContent();
        });
    };

    var scrollHandler = function() {
      didScroll = true;
      setTimeout( function() { scrollPage(); }, 60 );
    };

    // changes the grid perspective origin as we scroll the page
  	var scrollPage = function() {
  		var perspY = $(window).scrollTop() + $(window).height() / 2;
      gridWrap.css('-webkit-perspective-origin','50% ' + perspY + 'px');
      gridWrap.css('-moz-origin','50% ' + perspY + 'px');
      gridWrap.css('perspective-origin','50% ' + perspY + 'px');
  		didScroll = false;
  	};

    var resizeHandler = function() {
      function delayed() {
        resizePlaceholder();
        scrollPage();
      }
      if ( resizeTimeout ) {
        clearTimeout( resizeTimeout );
      }
      resizeTimeout = setTimeout( delayed, 50 );
    };

    //resize placeholder to cover screen
    var resizePlaceholder = function() {
      //placeholder neu definieren
      placeholder = $('.placeholder');
      // need to recalculate all these values as the size of the window changes
      itemSize = { width : gridItemBack.outerWidth(), height : gridItemBack.outerHeight() };
      if( placeholder ) {
        // set the placeholders top to "0 - grid offsetTop" and left to "0 - grid offsetLeft"
        var gridOffset = grid.offset();
        placeholder.css('left', Number( -1 * ( gridOffset.left - $(window).scrollLeft() ) ) + 'px');
        placeholder.css('top', Number( -1 * ( gridOffset.top - $(window).scrollTop() ) ) + 'px');
        // set the placeholders width to windows width and height to windows height
        placeholder.css('width', $(window).width() + 'px');
        placeholder.css('height', $(window).height() + 'px');
      }
    };

    //events
    function init() {

      gridContentOpener.click(showContent);
      gridContentCloser.click(hideContent);
    }

    return {
      init: init
    }

  })();
