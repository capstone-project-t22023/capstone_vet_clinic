<div class="sidebar-item search-form">
    <form action="search.php" method="POST">
        <input type="text" name="search_query" placeholder="Search...">
        <button type="submit"><i class="bi bi-search"></i></button>
    </form>
</div>
<?php
// Include your database connection code here
// For example, if you're using MySQL with mysqli:
// $conn = mysqli_connect("localhost", "username", "password", "database_name");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the search query from the form
    $search_query = $_POST["search_query"];

    // Perform a database query to search for matching blog posts
    $sql = "SELECT * FROM blog_posts WHERE title LIKE '%" . $search_query . "%' OR content LIKE '%" . $search_query . "%'";
    $result = mysqli_query($conn, $sql);

    // Check if there are matching results
    if (mysqli_num_rows($result) > 0) {
        echo "<h2>Search Results:</h2>";

        // Loop through the matching results and display them
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<h3><a href='" . $row["post_url"] . "'>" . $row["title"] . "</a></h3>";
            echo "<p>" . $row["content"] . "</p>";
        }
    } else {
        echo "No results found.";
    }

    // Close the database connection
    mysqli_close($conn);
}
?>
