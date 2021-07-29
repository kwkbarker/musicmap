# MusicMap
## Final Project by Kevin Barker
### CS50w
### 4/20/2021

## Description

MusicMap is a web application using the Google Maps API to create an interactive and dynamic visualization of music collections by their geographic locations. 

MusicMap uses a Django backend and a JavaScript front end.

As examples, I have populated the map with two collections: the first is "Live With Me On Earth: World Folk Rock," a compilation I curated of songs by artists from around the world during the late 1960s to early 1980s that fuse folk and rock music. I do not own the licenses to these recordings and they are used purely for educational purposes on this student project. Performers and publishers may contact the author at kwkbarker@gmail.com to remove any material they wish not to be included.

The second collection is a selection of posts from the excellent website Excavated Shellac, curated by Jonathan Ward from his extensive and wonderful collection of early 20th century 78rpm recordings from all over the globe. I have reproduced the content of his posts within the InfoWindows and included links to the original posts. This content is used with the gracious permission of Jonathan.

The goal of this project is to create an easier way to visualize the localization and regionalization of music. Global collections like those included are obvious choices, but other examples could include mapping regional styles of American Hip Hop, collections by instrument (traditional fiddle styles, clarinet styles from the balkans to new orleans), music of the Silk Road, and even such granular maps as locating loft jazz recordings from the 70s NYC or an extensive map of Grateful Dead tours by year. Further, online music collections such as the Library of Congress, Lomax Archive, Bibliotheque Nationale Francaise, Frontera Collection and many more could be used to create fascinating maps of their extensive and historic content.

## Usage

Upon loading the page, the empty map loads across the entire browser window. A select box in the top left corner allows the user to select a collection to load. Once a collection is selected, the application uses a JavaScript fetch to query the database for all entries that belong to that collection. Those entries are then placed as markers on the map based on the latitude and longitude coordinates saved in the model. Each marker is given a click event handler such that a click opens an InfoWindow that contains an audio file of the song and a description of the artist and/or song.

The song will play as long as the InfoWindow is open. The user is free to scroll in and out and across the map, and the InfoWindow resizes in order to not exceed the map's dimensions as the user zooms out. If the user clicks on another marker, the current window closes and the clicked marker's window opens. The user may select another collection from the select box in the upper left corner to display that collection's content.

## Technologies Used

Python 3
Django
JavaScript
Google Maps JavaScript API

## Database

On the backend, a single Django model is used, which saves each of the entries. It saves which collection an entry belongs to, the latitude and longitude of its marker, the link to the audio file (currently saved in my personal Dropbox) and its label, the html string of the contents of the InfoWindow, and the heading and referring link. These fields are retrieved via an asynchronous JavaScript fetch query to the database.

## Files

apps.js contains all of the JavaScript code, and styles.css contains the styling code. views.py renders the index page (index.html - it's a single-page application) and has a route for returning the markers from the database when queried with a post request from the JS front end.

## Future Improvements

Possible upgrades and improvements include:

- allowing users to select multiple collections at once
- allowing users to create their own collections, perhaps saved in a user account, especially if the application is used by educators as an in-class tool
- streamlining the visual design (I suck at CSS)
- an audio player with a queue so that users can keep listening to a song as they browse other collections & collection items
- a video player for video examples

## Acknowlegement

Thanks to Jonathan Ward for permission to use his Excavated Shellac posts. Please seek out his commercial releases Excavated Shellac, Opika Pende, Excavated Shellac: Strings, and Excavated Shellac: Reeds, available from Dust-to-Digital [https://dust-digital.com/].

#### Contact

kwkbarker@gmail.com
