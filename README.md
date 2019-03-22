```
 ________  _________  ___       ________  ________      
|\   __  \|\___   ___\\  \     |\   __  \|\   ____\     
\ \  \|\  \|___ \  \_\ \  \    \ \  \|\  \ \  \___|_    
 \ \   __  \   \ \  \ \ \  \    \ \   __  \ \_____  \   
  \ \  \ \  \   \ \  \ \ \  \____\ \  \ \  \|____|\  \  
   \ \__\ \__\   \ \__\ \ \_______\ \__\ \__\____\_\  \ 
    \|__|\|__|    \|__|  \|_______|\|__|\|__|\_________\
                                            \|_________|
```

# ATLAS Coding Challenge

This micro project is created as a solution for  AGHI coding challenge.

### Demo
This project is hosted on github pages at following link

[https://shankydoodle.github.io/atlas-app/](https://shankydoodle.github.io/atlas-app/)


### Description

* A panel is created that displays a table of all communities in Alta Verapaz and the total case count at each community.
* This panel have collapse and expand functionality.
* The columns of the table are sortable. 
    - For very first render, both columns are in non sorted sequence and are visible as they are in data.
    - On click of sort icon, sort order is toggled between ascending and descending order.
    - Standard behaviour of sorting is applied here. At one time, only one column can have sorting order i.e. if 'Name' column is sorted then previous sort order applied to other column 'Cases' may get lost and vice versa
    - Sort order is case insensitive
* To handle huge data, '**load more**' functionality is added to the panel list. 
    - Auto load on scroll is implemented to handle load more.
    - On every load more request or api call next 100 items are rendered. 
 
 
### Installation
* Clone or download the project.
* Install node dependencies<br>
    ``
        npm install
    ``
    
* To run the app in the development mode.<br>
    ``
        npm start
    ``
    <br>Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
    The page will reload if you make edits.<br>
    
    
### Limitation / Notes
* On large data, sliding animation of panel may show lagging behaviour.
* On ascending sort by 'Name' column, user may think that 1st 100 elements are showing wrong output,
but its because of few data entries in given data set have empty space in the start of its name entry. Functionality is working fine.