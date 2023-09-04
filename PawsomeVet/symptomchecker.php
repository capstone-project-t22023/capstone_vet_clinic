<!DOCTYPE html>
<html lang="en-AU">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Symptom Checker</title>
  <meta content="Symptom Checker" name="description">
  <meta content="pet clinic, pet, pet treatment" name="keywords">

  <!--FAVICON -->
  <link href="assets/img/Logo.jpg" rel="icon">

  <!-- GOOGLE FONTS-->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700iNunito:300,300i,400,400i,600,600i,700,700iPoppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- CSS LIBRARIES -->
  <link href="assets/vendors/aos/aos.css" rel="stylesheet">
  <link href="assets/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendors/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendors/fontawesome-free-6.4.2-web/css/all.css" rel="stylesheet">
  <link href="assets/vendors/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- MAIN CSS FILE -->
  <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <!--HEADER -->
  <header id="header" class="header fixed-top">
    <div class="container-fluid container-xl d-flex align-items-start justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
        <img src="assets/img/logo.jpg" alt="PawsomeVet Logo">
        <span>PawsomeVet</span>
      </a>
 <!-- .navbar -->
      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto" href="index.html">OUR SERVICES</a></li>
          <li><a class="nav-link scrollto" href="aboutus.html">ABOUT US</a></li>
          <li class="dropdown"><a href="petarticles"><span>PET ARTICLES</span> <i class="bi bi-chevron-down"></i></a>
          <ul>
            <li><a href="petforms.html">Pet Forms</a></li>
            <li><a href="puppyandkittencheck.html">Puppy &amp; Kitten Check</a></li>
            <li><a href="poisonguide.html">Poison Guide</a></li>
            <li><a href="groomingservices.html">Grooming Services</a></li>
            <li><a href="fees.html">Fees &amp; Insurance</a></li>
            <li><a href="symptomchecker.php">Symptom Checker</a></li>
          </ul>
          <li><a class="nav-link scrollto" href="index.html">F.A.Q.</a></li>
          <li><a class="nav-link scrollto" href="index.html">TEAM</a></li>
          <li><a class="nav-link scrollto" href="blog.html">BLOG</a></li>
		      <li><a class="nav-link scrollto me-md-2" href="index.html">CONTACT</a></li>
          <li><button class="btn btn-primary" type="button">SIGN UP</button></li>
          <li><button class="btn btn-success" type="button">SIGN IN</button></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

  
    <!-- BREADCRUMBS -->
    <section class="breadcrumbs">
        <div class="container">
  
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>Symptom Checker</li>
          </ol>
          <h2>Symtom Checker</h2>
  
        </div>
      </section><!-- End Breadcrumbs -->

    <br>
    <div class="container pt-5 my-5" data-aos="fade-up"  data-aos-delay="200">
      <div class="row justify-content-md-center">
        <div class="col-8">
        <h1>PawsomeVet Symptom Checker App</h1>
        <br>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $selectedSpecies = $_POST["species"];
        $selectedSymptoms = $_POST["symptoms"];

        // Simulated symptom assessments for demonstration
        $symptomsAssessment = array(
            "Lethargy or Weakness" => "Various underlying causes, including infections, pain, or systemic issues.",
            // ... other symptom assessments ...
        );

        echo "<h2>Assessment for $selectedSpecies:</h2>";
        echo "<p>Based on the symptoms you've selected, potential health issues your pet may be experiencing could include:</p>";
        echo "<ul>";
        foreach ($selectedSymptoms as $symptom) {
            echo "<li><strong>$symptom:</strong> " . $symptomsAssessment[$symptom] . "</li>";
        }
        echo "</ul>";
        echo "<p>For a proper diagnosis and personalized treatment recommendations, consult a veterinarian. In emergencies or worsening conditions, contact us or seek local veterinary care.</p>";
    } else {
    ?>
    <form method="post" action="">
        <label for="species">Select Your Pet's Species:</label>
        <select id="species" class="species" name="species">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
        </select>
        <br><br>
        <label class="select">Select Symptoms:</label><br>
        <input type="checkbox" name="symptoms[]" value="Lethargy or Weakness"> Lethargy or Weakness<br>
        <input type="checkbox" name="symptoms[]" value="Vomiting or Diarrhea"> Vomiting or Diarrhea<br>
        <input type="checkbox" name="symptoms[]" value="Loss of Appetite"> Loss of Appetite<br>
        <input type="checkbox" name="symptoms[]" value="Excessive Thirst or Urination"> Excessive Thirst or Urination<br>
        <input type="checkbox" name="symptoms[]" value="Coughing or Sneezing"> Coughing or Sneezing<br>
        <input type="checkbox" name="symptoms[]" value="Difficulty Breathing"> Difficulty Breathing<br>
        <input type="checkbox" name="symptoms[]" value="Itchy Skin or Rash"> Itchy Skin or Rash<br>
        <input type="checkbox" name="symptoms[]" value="Limping or Difficulty Walking"> Limping or Difficulty Walking<br>
        <input type="checkbox" name="symptoms[]" value="Swollen or Tender Abdomen"> Swollen or Tender Abdomen<br>
        <input type="checkbox" name="symptoms[]" value="Unexplained Weight Loss or Gain"> Unexplained Weight Loss or Gain<br>
        <input type="checkbox" name="symptoms[]" value="Excessive Drooling"> Excessive Drooling<br>
        <input type="checkbox" name="symptoms[]" value="Changes in Behavior or Personality"> Changes in Behavior or Personality<br>
        <input type="checkbox" name="symptoms[]" value="Watery or Red Eyes"> Watery or Red Eyes<br>
        <input type="checkbox" name="symptoms[]" value="Bleeding or Wounds"> Bleeding or Wounds<br>
        <input type="checkbox" name="symptoms[]" value="Hair Loss or Unusual Sheddin"> Hair Loss or Unusual Shedding<br>
        <input type="checkbox" name="symptoms[]" value="Difficulty Chewing or Swallowing"> Difficulty Chewing or Swallowing<br>
        <!-- ... other symptom checkboxes ... -->
        <br><br>
        <input type="submit" class= "btn btn-primary" value="Get Assessment">
    </form>

    <?php
    }
    ?>
      </div>
    </div>
  </div>
<br>
<div class="text-center">
<p> For a proper diagnosis and personalized treatment recommendations, consult a veterinarian. In emergencies or worsening conditions, contact us or seek local veterinary care.</p>
<p><strong>Note</strong>: This Symptom Checker app is intended for informational purposes only. Professional veterinary advice should always be sought for accurate guidance on your pet's health.</p>
  </div>

</body>
    <!--FOOTER -->
    <footer id="footer" class="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-5 col-md-12 footer-info">
                <a href="index.html" class="logo d-flex align-items-center">
                  <img src="assets/img/Logo.jpg" alt="">
                  <span>Poison Guide</span>
                </a>
                <br>
                <br>
                <p><b>Where all paws are treated<br>with care.</b></p>
                <br>
                <br>
                <br>            
                <div class="social-links mt-3">
                  <a href="#" class="twitter"><i class="fa-brands fa-square-twitter fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                  <a href="#" class="facebook"><i class="fa-brands fa-square-facebook fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                  <a href="#" class="instagram"><i class="fa-brands fa-square-instagram fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                  <a href="#" class="linkedin"><i class="fa-brands fa-linkedin fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                </div>
              </div>
    
              <div class="col-lg-2 col-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="generalcheckup.html"><b>General Check-Up</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i> <a href="healthconcerns.html"><b>Health Concerns Consultations</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i> <a href="dentistry.html"><b>Dentistry</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i> <a href="surgery.html"><b>Surgery</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i> <a href="emergencyservices.html"><b>Emergency Services</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i> <a href="nutritionprograms.html"><b>Nutrition Programs</b></a></li>
                </ul>
              </div>
    
              <div class="col-lg-2 col-6 footer-links">
                <h4>Pet Info</h4>
                <ul>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="petforms.html"><b>Pet Forms</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="puppyandkittencheck.html"><b>Puppy &amp; Kitten Check</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="poisonguide.html"><b>Poison Guide</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="groomingservices.html"><b>Grooming Services</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="fees.html"><b>Fees &amp; Insurance</b></a></li>
                  <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="symptomchecker.php"><b> Symptom Checker</b></a></li>
                </ul>
              </div>
    
              <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>Contact Us</h4>
                <p>
                  1 New Street <br>
                  Sydney 2000 NSW <br>
                  Australia <br><br>
                  <strong>Phone:</strong>+ (02) 9519 4111 / +(02)95194112<br>
                  <strong>Email:</strong> info@pawsomevet.com.au<br>inquiry@pawsomevet.com.au
                </p>
    
              </div>
    
            </div>
          </div>
        </div>
    
        <div class="container">
          <div class="copyright">
            &copy; Copyright 2023 <strong><span>PawsomeVet</span></strong>. <a href="privacypolicy.html">Privacy Policy</a>| <a href="termsandconditions.html">Terms & Conditions</a>
          </div>
        </div>
      </footer><!-- End Footer -->
    
      <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-up fa-beat fa-2xl" style="color: #ffffff;"></i></a>
    
      <!-- VENDOR JS FILES-->
      <script src="assets/vendors/aos/aos.js"></script>
      <script src="assets/vendors/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="assets/vendors/fontawesome-free-6.4.2-web/js/fontawesome.min.js"></script>
      <script src="assets/vendors/glightbox/js/glightbox.min.js"></script>
      <script src="assets/vendors/swiper/swiper-bundle.min.js"></script>
      <script src="assets/vendors/php-email-form/validate.js"></script>
    
      <!-- MAIN JS FILE -->
      <script src="assets/js/main.js"></script>
</html>
