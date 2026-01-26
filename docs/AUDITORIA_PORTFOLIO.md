Quero implementar nos cards a estrutura e layout do html abaixo e adicionando a animação dessa referencia: "https://codepen.io/danilonovaisv/pen/VYjejyb", mantendo o restante das sessões como estão. 
[<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="style/images/favicon.png">
<title>Finch</title>
<!-- Bootstrap core CSS -->
<link href="style/css/bootstrap.css" rel="stylesheet">
<link href="style/css/settings.css" rel="stylesheet">
<link href="style/css/owl.carousel.css" rel="stylesheet">
<link href="style/css/animsition.min.css" rel="stylesheet">
<link href="style/css/fotorama.css" rel="stylesheet">
<link href="style/css/divas.css" rel="stylesheet">
<link href="style/js/google-code-prettify/prettify.css" rel="stylesheet">
<link href="style/js/fancybox/jquery.fancybox.css" rel="stylesheet" type="text/css" media="all" />
<link href="style/js/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.2" rel="stylesheet" type="text/css" />
<link href="style.css" rel="stylesheet">
<link href="style/css/color/green.css" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800' rel='stylesheet' type='text/css'>
<link href="style/type/fontello.css" rel="stylesheet">
<link href="style/type/budicons.css" rel="stylesheet">
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="style/js/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
      <![endif]-->
</head>
<body class="full-layout">
<div class="body-wrapper animsition">
  <div class="navbar default centered">
    <div class="navbar-header">
      <div class="container basic-wrapper"> <a class="btn responsive-menu pull-right" data-toggle="collapse" data-target=".navbar-collapse"><i></i></a>
        <div class="navbar-brand text-center"><a href="index.html"><img src="style/images/logo.png" alt="" data-src="style/images/logo.png" data-ret="style/images/logo@2x.png" class="retina" /></a></div>
      </div>
      <!--/.container -->
      <nav class="collapse navbar-collapse text-center">
        <ul class="nav navbar-nav">
          <li class="dropdown"><a href="#" class="dropdown-toggle js-activated">Home</a>
            <ul class="dropdown-menu">
              <li><a href="index.html">Home 1</a></li>
              <li><a href="index2.html">Home 2</a></li>
              <li><a href="index3.html">Home 3</a></li>
              <li><a href="index4.html">Home 4</a></li>
              <li><a href="index5.html">Home 5</a></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#" class="dropdown-toggle js-activated">Headers</a>
            <ul class="dropdown-menu">
              <li><a href="header.html">Centered Header</a></li>
              <li><a href="header2.html">Simple Header</a></li>
              <li><a href="header3.html">Extended Header</a></li>
            </ul>
          </li>
          <li><a href="about.html">About Us</a></li>
          <li class="dropdown"><a href="#" class="dropdown-toggle js-activated">Our Journal</a>
            <ul class="dropdown-menu">
              <li><a href="blog.html">Blog 1</a></li>
              <li><a href="blog2.html">Blog 2</a></li>
              <li><a href="blog3.html">Blog 3</a></li>
              <li><a href="blog-post.html">Blog Post</a></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#" class="dropdown-toggle js-activated">Portfolio</a>
            <ul class="dropdown-menu">
              <li><a href="portfolio.html">Masonry Grid</a></li>
              <li><a href="portfolio2.html">Fullscreen Grid</a></li>
              <li><a href="portfolio3.html">Classic Masonry Grid</a></li>
              <li><a href="portfolio4.html">Masonry Grid w/ Lightbox</a></li>
              <li><a href="portfolio5.html">Fullscreen Grid w/ Lightbox</a></li>
              <li><a href="portfolio6.html">Classic Masonry Grid w/ Lightbox</a></li>
              <li><a href="portfolio-post.html">Post with Carousel</a></li>
              <li><a href="portfolio-post2.html">Post with Fotorama</a></li>
              <li><a href="portfolio-post3.html">Post with Slider</a></li>
              <li><a href="portfolio-post4.html">Post with Static Images</a></li>
              <li><a href="portfolio-post5.html">Post with Video</a></li>
            </ul>
          </li>
          <li><a href="services.html">Services</a></li>
          <li class="dropdown"><a href="#" class="dropdown-toggle js-activated">Features</a>
            <ul class="dropdown-menu">
              <li class="dropdown-submenu"><a href="#">Sliders</a>
                <ul class="dropdown-menu">
                  <li><a href="index.html">Revolution Slider</a></li>
                  <li><a href="index2.html">Fotorama</a></li>
                  <li><a href="index5.html">Divas Slider</a></li>
                  <li><a href="portfolio-post.html">Swiper</a></li>
                  <li><a href="portfolio-post3.html">Owl Carousel</a></li>
                </ul>
              </li>
              <li><a href="elements.html">Elements</a></li>
              <li><a href="headings.html">Headings</a></li>
              <li><a href="pricing.html">Pricing Tables</a></li>
              <li><a href="budicon.html">Font Icons - Budicon</a></li>
              <li><a href="fontello.html">Font Icons - Fontello</a></li>
            </ul>
          </li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
    <!--/.navbar-header --> 
    
  </div>
  <!--/.navbar -->
  
  <div class="offset2"></div>
  <div class="light-wrapper">
    <div class="container inner">
      <h1 class="intro text-center">Hello! We are Finch Studio</h1>
      <p class="lead main text-center">We are a digital photography studio specializing in landscape, advertorial and conceptual photography, based in New York. We love to turn ideas into beautiful things.</p>
      <h3 class="section-title pull-left">Our Awesome Shots</h3>
      <div class="portfolio classic-masonry">
        <div id="filters" class="button-group pull-right">
          <button class="button is-checked" data-filter="*">All</button>
          <button class="button" data-filter=".web">Web Design</button>
          <button class="button" data-filter=".graphic">Graphic Design</button>
          <button class="button" data-filter=".video">Motion Graphics</button>
          <button class="button" data-filter=".photography">Photography</button>
        </div>
        <div class="clearfix"></div>
        <div class="isotope items">
          <div class="item web">
            <figure><a href="style/images/art/pm1-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-01">
              <div class="text-overlay">
                <div class="info"><span>Fringilla Fermentum Sem</span></div>
              </div>
              <img src="style/images/art/pm1.jpg" alt="" /> </a></figure>
            <div id="title-01" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
              <div class="fancybody">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus commodo.</div>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item graphic">
            <figure><a href="style/images/art/pm2-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-02">
              <div class="text-overlay">
                <div class="info"><span>Vestibulum Tellus</span></div>
              </div>
              <img src="style/images/art/pm2.jpg" alt="" /> </a></figure>
            <div id="title-02" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item web">
            <figure><a href="style/images/art/pm3-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-03">
              <div class="text-overlay">
                <div class="info"><span>Vehicula Amet</span></div>
              </div>
              <img src="style/images/art/pm3.jpg" alt="" /> </a></figure>
            <div id="title-03" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
              <div class="fancybody">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus commodo.</div>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item video">
            <figure><a href="style/images/art/pm4-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-04">
              <div class="text-overlay">
                <div class="info"><span>Consectetur Justo</span></div>
              </div>
              <img src="style/images/art/pm4.jpg" alt="" /> </a></figure>
            <div id="title-04" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item web">
            <figure><a href="style/images/art/pm5-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-05">
              <div class="text-overlay">
                <div class="info"><span>Etiam Quam</span></div>
              </div>
              <img src="style/images/art/pm5.jpg" alt="" /> </a></figure>
            <div id="title-05" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm6-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-06">
              <div class="text-overlay">
                <div class="info"><span>Fusce Ornare Lorem</span></div>
              </div>
              <img src="style/images/art/pm6.jpg" alt="" /> </a></figure>
            <div id="title-06" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item web">
            <figure><a href="style/images/art/pm7-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-07">
              <div class="text-overlay">
                <div class="info"><span>Sit Amet Ridiculus</span></div>
              </div>
              <img src="style/images/art/pm7.jpg" alt="" /> </a></figure>
            <div id="title-07" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item graphic">
            <figure><a href="style/images/art/pm8-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-08">
              <div class="text-overlay">
                <div class="info"><span>Malesuada Dolor Nibh</span></div>
              </div>
              <img src="style/images/art/pm8.jpg" alt="" /> </a></figure>
            <div id="title-08" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item video">
            <figure><a href="style/images/art/pm9-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-09">
              <div class="text-overlay">
                <div class="info"><span>Ridiculus Lorem Consectetur</span></div>
              </div>
              <img src="style/images/art/pm9.jpg" alt="" /> </a></figure>
            <div id="title-09" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item graphic">
            <figure><a href="style/images/art/pm10-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-10">
              <div class="text-overlay">
                <div class="info"><span>Bibendum Purus</span></div>
              </div>
              <img src="style/images/art/pm10.jpg" alt="" /> </a></figure>
            <div id="title-10" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm11-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-11">
              <div class="text-overlay">
                <div class="info"><span>Pellentesque Etiam Egestas</span></div>
              </div>
              <img src="style/images/art/pm11.jpg" alt="" /> </a></figure>
            <div id="title-11" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm12-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-12">
              <div class="text-overlay">
                <div class="info"><span>Inceptos Ultricies Elit</span></div>
              </div>
              <img src="style/images/art/pm12.jpg" alt="" /> </a></figure>
            <div id="title-12" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm13-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-13">
              <div class="text-overlay">
                <div class="info"><span>Fringilla Quam</span></div>
              </div>
              <img src="style/images/art/pm13.jpg" alt="" /> </a></figure>
            <div id="title-13" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm14-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-14">
              <div class="text-overlay">
                <div class="info"><span>Pellentesque Cras</span></div>
              </div>
              <img src="style/images/art/pm14.jpg" alt="" /> </a></figure>
            <div id="title-14" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm15-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-15">
              <div class="text-overlay">
                <div class="info"><span>Ligula Etiam</span></div>
              </div>
              <img src="style/images/art/pm15.jpg" alt="" /> </a></figure>
            <div id="title-15" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
          <div class="item photography">
            <figure><a href="style/images/art/pm16-full.jpg" class="fancybox-media" data-rel="grid-portfolio" data-title-id="title-16">
              <div class="text-overlay">
                <div class="info"><span>Condimentum Parturient</span></div>
              </div>
              <img src="style/images/art/pm16.jpg" alt="" /> </a></figure>
            <div id="title-16" class="info hidden">
              <h2>Vulputate Cursus Mollis</h2>
            </div>
            <!-- /.info .hidden --> 
          </div>
        </div>
      </div>
      <!-- /.portfolio -->
      
      <div class="divide70"></div>
      <h3 class="section-title text-center">Let's make something great together</h3>
      <div class="text-center"> <a href="#" class="btn btn-large fixed-width">View More Work</a> <a href="#" class="btn btn-large btn-maroon fixed-width">Get in Touch</a> </div>
    </div>
    <!-- /.container --> 
  </div>
  <!-- /.light-wrapper -->
  
  <footer class="footer black-wrapper widget-footer">
    <div class="container inner">
      <div class="thin text-center">
        <h3 class="section-title text-center">Get in Touch with Us</h3>
        <p>Maecenas faucibus molli interdum. Cras mattis consectetur purus sitor amet sed donec malesuada ullamcorper odio. Curabitur blandit tempus porttitor vollisky inceptos mollisestor.</p>
        <div class="divide20"></div>
        <ul class="social">
          <li><a href="#"><i class="icon-s-rss"></i></a></li>
          <li><a href="#"><i class="icon-s-twitter"></i></a></li>
          <li><a href="#"><i class="icon-s-facebook"></i></a></li>
          <li><a href="#"><i class="icon-s-dribbble"></i></a></li>
          <li><a href="#"><i class="icon-s-pinterest"></i></a></li>
        </ul>
        <div class="divide40"></div>
        <div class="contact-info"> <span> Moonshine St. 14/05 Light City </span> <span>+00 (123) 456 78 90 </span> <span> <a href="first.last@email.com">first.last@email.com </a></span> </div>
        <!-- .contact-info --> 
        
      </div>
      <!-- .thin --> 
      
    </div>
    <!-- .container -->
    
    <div class="sub-footer">
      <div class="container">
        <p class="text-center">© 2014 Zonya. All rights reserved. Theme by <a href="http://elemisfreebies.com">elemis</a>.</p>
      </div>
    </div>
  </footer>
  <!-- /footer --> 
  
</div>
<!-- /.body-wrapper --> 
<script src="style/js/jquery.min.js"></script> 
<script src="style/js/bootstrap.min.js"></script> 
<script src="style/js/twitter-bootstrap-hover-dropdown.min.js"></script> 
<script src="style/js/retina.js"></script> 
<script src="style/js/jquery.slickforms.js"></script> 
<script src="style/js/jquery.animsition.min.js"></script> 
<script src="style/js/isotope.pkgd.min.js"></script> 
<script src="style/js/owl.carousel.min.js"></script>  
<script src="style/js/jquery.easytabs.min.js"></script> 
<script src="style/js/google-code-prettify/prettify.js"></script> 
<script src="style/js/fotorama.js"></script> 
<script src="style/js/jquery.dcflickr.1.0.js"></script> 
<script src="style/js/idangerous.swiper.min.js"></script> 
<script src="style/js/jquery.fancybox.pack.js"></script> 
<script src="style/js/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.2"></script> 
<script src="style/js/fancybox/helpers/jquery.fancybox-media.js?v=1.0.0"></script> 
<script src="style/js/jquery.fitvids.js"></script> 
<script src="style/js/jquery.themepunch.revolution.min.js"></script> 
<script src="style/js/jquery.themepunch.tools.min.js"></script> 
<script src="style/js/jquery.divas-1.0.min.js"></script> 
<script src="style/js/imagesloaded.pkgd.min.js"></script> 
<script src="style/js/scripts.js"></script>
</body>
</html>"]


CODIGOS DA REFERECIA DE ANIMAÇÃO:

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Responsive Vertical Scrolling Parallax Gallery ( Lerp )</title>
    <link rel="stylesheet" href="./style.css">

  </head>
    
  <body>
  <main class='gallery'>
  <div class='gallery-track'>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1607419726991-5fc7e74cda67?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1514439827219-9137a0b99245?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1525790935716-36a6c45ad067?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1561344640-2453889cde5b?q=80&w=2467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1561602009-0ecd1cada8bd?q=80&w=2456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1560583306-bd304a162229?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?q=80&w=2382&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1610322231968-31322d42851f?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1561344640-2453889cde5b?q=80&w=2467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1536890992765-f42a1ee1e2a8?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1560583306-bd304a162229?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=2280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1627740660376-bc7506720b8a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1563964040780-8605906e3eb6?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1592507645647-f2f1d8103c86?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1541591681685-0246308f076b?q=80&w=2489&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1539027994943-7d6960acfaad?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1573501815578-6252ee088c47?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1558273246-57d22047406d?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1534685042784-4c7c97ae40d7?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
    <div class='card'>
      <div class='card-image-wrapper'>
        <img src='https://images.unsplash.com/photo-1627740660376-bc7506720b8a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </div>
    </div>
  </div>
</main>
    <script  src="./script.js"></script>

  </body>
  
</html>



----


"use strict";
const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;
const lerp = (start, end, t) => start * (1 - t) + end * t;
function updateScroll() {
    startY = lerp(startY, endY, easing);
    gallery.style.height = `${track.clientHeight}px`;
    track.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1))
        cancelAnimationFrame(raf);
}
function startScroll() {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
}
function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const { top } = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
}
const activateParallax = () => cards.forEach(parallax);
function init() {
    activateParallax();
    startScroll();
}
window.addEventListener('load', updateScroll, false);
window.addEventListener('scroll', init, false);
window.addEventListener('resize', updateScroll, false);



-----



* {
  margin: 0;
  padding:0;
  box-sizing: border-box;
}

.gallery-track {
  position: fixed;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  will-change: transform;
}

.card {
  height: 400px;
  overflow: hidden;

  & .card-image-wrapper {
    height: 135%;
    will-change: transform;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
} 

@media (width < 800px) {
  .gallery-track {
    grid-template-columns: repeat(2,1fr);
  }
}

@media (width < 550px) {
  .gallery-track {
    grid-template-columns: repeat(1,1fr);
  }
}

Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

