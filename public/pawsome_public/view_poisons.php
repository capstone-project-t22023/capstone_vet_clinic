<?php
// Establish a database connection (replace with your credentials)
$conn = new mysqli("localhost", "root", "", "pet_poisons");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve selected animal type from the form
$animal_type = $_GET['animal_type'];

// Retrieve poison data based on the selected animal type
$sql = "SELECT * FROM poisons WHERE animal_type = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $animal_type);
$stmt->execute();
$result = $stmt->get_result();

?>
<!DOCTYPE html>
<html lang="en-AU">
   <head>
      <meta charset="utf-8">
      <meta content="width=device-width, initial-scale=1.0" name="viewport">
      <title>PawsomeVet | Pet Poison Guide - <?php echo $animal_type; ?></title>
      <meta content="Modern pet veterinary clinic in Sydney" name="description">
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
   <body style="background-image: url('assets/img/background.png');">
      <!--HEADER-->
      <header id="header" class="header fixed-top">
         <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="index.html" class="logo d-flex align-items-center">
            <img src="assets/img/Logo.jpg" alt="PawsomeVet Logo">
            <span>PawsomeVet</span>
            </a>
            <!-- .navbar -->
            <nav id="navbar" class="navbar">
               <ul>
                  <li><a class="nav-link scrollto" href="index.html">OUR SERVICES</a></li>
                  <li><a class="nav-link scrollto active" href="aboutus.html">ABOUT US</a></li>
                  <li class="dropdown">
                     <a href="#"><span>PET ARTICLES</span> <i class="bi bi-chevron-down"></i></a>
                     <ul>
                        <li class="dropdown">
                           <a href="#"><span>Pet Forms</span><i class="bi bi-chevron-right"></i></a>
                           <ul>
                              <li><a href="https://forms.gle/QAn3qKECoKKWUHD68">New Client Form</a></li>
                              <li><a href="https://forms.gle/W6rFrG1ouqS7kPMJA">Foster Drop-OFF Form</a></li>
                           </ul>
                        </li>
                        <li><a href="puppyandkittencheck.html">Puppy &amp; Kitten Check</a></li>
                        <li><a href="poisonguide.html">Poison Guide</a></li>
                        <li><a href="groomingservices.html">Grooming Services</a></li>
                        <li><a href="fees.html">Fees &amp; Insurance</a></li>
                        <li><a href="virtualpet.html">Virtual Pet</a></li>
                        <li><a href="vetchatbot.html"><img src="assets/img/vetchatbotlogo.png" alt="Vet Chatbot Logo Image"></a></li>
                     </ul>
                  <li><a class="nav-link scrollto" href="index.html">F.A.Q.</a></li>
                  <li><a class="nav-link scrollto" href="index.html">TEAM</a></li>
                  <li><a class="nav-link scrollto" href="blog.html">BLOG</a></li>
                  <li><a class="nav-link scrollto me-md-2" href="index.html">CONTACT</a></li>
                  <li><a class="btn btn-primary" href="http://localhost:3000/signup" role="button">SIGN UP</a></li>
                  <li><a class="btn btn-success" href="http://localhost:3000/login" role="button">SIGN IN</a></li>
               </ul>
               <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
         </div>
      </header>
      <!-- End Header -->
      <main id="main">
         <!-- BREADCRUMBS -->
         <section class="breadcrumbs">
            <div class="container">
               <ol>
                  <li><a href="index.html">Home</a></li>
                  <li>Pet Poison Guide - <?php echo $animal_type; ?></li>
               </ol>
               <h2>Pet Poison Guide - <?php echo $animal_type; ?></h2>
            </div>
         </section>
         <!-- End Breadcrumbs -->
        <section>
        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
            <table id="myTable">
               <tr class="header">
                    <th style="width:40%;">Name</th>
                    <th style="width:40%;">Description</th>
                    <th style="width:40%;">Symptoms<th>
                    <th style="width:40%;">Urgency Level</th>
                </tr>
            <tbody>
                <?php
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['description'] . "</td>";
                    echo "<td>" . $row['symptoms'] . "</td>";
                    echo "<td>" . $row['urgency_level'] . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
        <script>
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
</script>
            </section>
</body>
         <!-- End #main -->
        <!--FOOTER -->
        <footer id="footer" class="footer">
            <div class="footer-top">
               <div class="container">
                  <div class="row gy-4">
                     <div class="col-lg-5 col-md-12 footer-info">
                        <a href="index.html" class="logo d-flex align-items-center">
                        <img src="assets/img/Logo.jpg" alt="">
                        <span>PawsomeVet</span>
                        </a>
                        <br>
                        <br>
                        <p><b>Where all paws are treated<br>with care.</b></p>
                        <br>
                        <br>
                        <br>            
                     <div class="social-links mt-3">
                        <a href="https://twitter.com/MalgoMika87" class="twitter"><i class="fa-brands fa-square-twitter fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100001882155591" class="facebook"><i class="fa-brands fa-square-facebook fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                        <a href="https://www.instagram.com/malgorzata_mikart/" class="instagram"><i class="fa-brands fa-square-instagram fa-bounce fa-xl" style="color: #7d005c;"></i></a>
                        <a href="https://www.linkedin.com/in/malgorzatamika/" class="linkedin"><i class="fa-brands fa-linkedin fa-bounce fa-xl" style="color: #7d005c;"></i></a>
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
                           <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="puppyandkittencheck.html"><b>Puppy &amp; Kitten Check</b></a></li>
                           <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="poisonguide.html"><b>Poison Guide</b></a></li>
                           <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="groomingservices.html"><b>Grooming Services</b></a></li>
                           <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="fees.html"><b>Fees &amp; Insurance</b></a></li>
                           <li><i class="fa-solid fa-paw fa-bounce fa-xl" style="color: #9e4554;"></i><a href="virtualpet.html"><b>Virtual Pet</b></a></li>
                           <li><a href="vetchatbot.html"><img src="assets/img/vetchatbotlogo.png" alt="Vet Chatbot Logo Image"></a></li>
                        </ul>
                     </div>
                     <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p><a href="https://maps.app.goo.gl/KcTqw4rbcvFrpX6o7" target="_blank" rel="noopener noreferrer">
                           10 Barrack Street<br>
                           Sydney 2000 NSW <br>
                           Australia <br></a><br>
                           <strong>Phone:</strong><a href="tel:0295194111">+(02)95194111</a><br><a href="tel:0295194112">+(02)95194112</a>
                           <strong>Email:</strong><a href="mailto:info@pawsomevet.com.au">info@pawsomevet.com.au</a><br><a href="mailto:inquiry@pawsomevet.com.au">inquiry@pawsomevet.com.au</a>
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
         </footer>
         <!-- End Footer -->
         <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-up fa-beat fa-2xl" style="color: #ffffff;"></i></a>
         <!-- VENDOR JS FILES-->
         <script src="assets/vendors/aos/aos.js"></script>
         <script src="assets/vendors/bootstrap/js/bootstrap.bundle.min.js"></script>
         <script src="assets/vendors/fontawesome-free-6.4.2-web/js/fontawesome.min.js"></script>
         <script src="assets/vendors/glightbox/js/glightbox.min.js"></script>
         <script src="assets/vendors/swiper/swiper-bundle.min.js"></script>
         <script src="assets/vendors/php-email-form/validate.js"></script>
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
         <!-- MAIN JS FILE -->
         <script src="assets/js/main.js"></script>
      </main>
   </body>
</html>

<?php
$stmt->close();
$conn->close();
?>
