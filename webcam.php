<!DOCTYPE HTML>
<html>

<head>
    <title>One Column - Halcyonic by HTML5 UP</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="assets/css/main.css" />
    <!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->

</head>

<body class="subpage">
    <div id="page-wrapper">

        <!-- Header -->
        <div id="header-wrapper">
            <header id="header" class="container">
                <div class="row">
                    <div class="12u">

                        <!-- Logo -->
                        <h1>
                            <a href="#" id="logo">Halcyonic</a>
                        </h1>

                        <!-- Nav -->
                        <nav id="nav">
                            <a href="index.html">Homepage</a>
                            <a href="threecolumn.html">Three Column</a>
                            <a href="twocolumn1.html">Two Column #1</a>
                            <a href="twocolumn2.html">Two Column #2</a>
                            <a href="onecolumn.html">One Column</a>
                        </nav>

                    </div>
                </div>
            </header>
        </div>

        <!-- Content -->
        <div id="content-wrapper">
            <div id="content">
                <div class="container">
                    <div class="row">
                        <div class="12u">

                            <!-- Main Content -->
                            <section>
                                <header>
                                    <h2>WEBCAM TEST</h2>
                                    <h3>Not working?</h3>
                                    <form action="wcRedirect.php" method="get">
                                    	put room name here: <input type="text" name="name"><br>
                                    </form>
                                    <iframe allow="camera; microphone" src=" https://appr.tc/ " style="height: 35em; width: 35em ">
                                        <p>Your browser does not support iframes.</p>

                                    </iframe>
                                    <?php
                                    	$html_select = file_get_contents("https://appr.tc/");
                                    	echo $html_select;
                                    ?>
                                </header>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div id="footer-wrapper ">
            <footer id="footer " class="container ">
                <div class="row ">
                    <div class="8u 12u(mobile) ">
                        <section>
                            <h2>Work in Progress</h2>
                        </section>
                        <!-- Links -->

                    </div>
                    <div class="4u 12u(mobile) ">

                        <!-- Blurb -->
                        <section>
                            <h2>CLICK HERE FOR AGENTS (WIP)</h2>
                            <a href="agent.html ">Click here</a>
                        </section>

                    </div>
                </div>
            </footer>
        </div>

        <!-- Copyright -->
        <div id="copyright ">
            &copy; Untitled. All rights reserved. | Design:
            <a href="http://html5up.net ">HTML5 UP</a>
        </div>

    </div>

    <!-- Scripts -->
    <script src="assets/js/jquery.min.js "></script>
    <script src="assets/js/skel.min.js "></script>
    <script src="assets/js/skel-viewport.min.js "></script>
    <script src="assets/js/util.js "></script>
    <!--[if lte IE 8]><script src="assets/js/ie/respond.min.js "></script><![endif]-->
    <script src="assets/js/main.js "></script>

</body>

</html>