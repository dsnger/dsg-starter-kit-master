$(document).ready(function(){console.log("App.js is ready"),$("#hamburger__trigger-overlay").on("click",function(e){e.preventDefault(),$(".nav-overlay").toggleClass("open close"),$(".site-wrapper").toggleClass("nav-overlay--open nav-overlay--close"),$(this).toggleClass("is-active")}),$(".button--effect-radomir").click(function(){$(this).addClass("button--click"),$(".button--effect-radomir").one("webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationEnd",function(){$(this).removeClass("button--click")})}),$(".ripple-effect").click(function(e){var i=document.createElement("div"),n=Math.max($(this).innerWidth(),$(this).innerHeight());i.className="ripple",$(this).append(i),$(".ripple").css("width",n+"px"),$(".ripple").css("height",n+"px"),$(".ripple").css("left",e.clientX-$(this).offset().left-n/2+"px"),$(".ripple").css("top",e.clientY-$(this).offset().top-n/2+"px"),$(".ripple-effect").one("webkitAnimationEnd oanimationend msAnimationEnd mozAnimationEnd animationEnd",function(){$(".ripple").remove()})}),$("select").material_select()});
//# sourceMappingURL=App.js.map