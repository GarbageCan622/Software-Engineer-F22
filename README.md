# Software-Engineering-F22
Cool place for cool people
hello



sandra's to do list (code):

already do:
necessary code is implemented, spaghettily
has correspondin html to best of my abilty in my limited experience with html

most of these changes are with mathStudent.html, since I only made 1 course instance, that being math.

changes:
1. course.categoryGrades is a map of maps, not a list of maps
2. assignment html was removed from the html page and is instead generated directly in the javascript file given a course and a student's id.
      (though <script> stuff </script> would work just as well in the html file?)
3. Assignment class now has a points attribute
   the grade attribute for Assignment is the points recieved, and the standardized scale is calculable from those 2 values.
   
iffy:
1. calculate grade needed (assignment) looks fishy
2. calcuate gpa looks fishy

bugs:
1. mock grades considered NaN if a full score is entered -> have a default value of 100 in case of falsy
2. adjust letter grade scaling fails if the adjusted scale is lower than the current (such as weighting an A at 80)
3. input field values disappear once a button is pressed in the same html div
4. shoud calculate grade needed consider all grades or just unpublished grades as it is currently?
5. 'export as pdf' has not been implemented
6. some grades (weighted or unweighted) display too much precision and some do not for some reason, working on it
7. homework 2 has a due date of wed dec 31 1969
8. unpublished grades show NaN as their grade -> make empty string
9. unpublished grades show undefined for points recieved -> make empty string
10. sort sorts only by assignment name instead of both category and assignment
11. buttons must be collapsed in order to remove the html after doing calculation actions (otherwise the html continues)
13. various typos in displayed text

needs:
1. calculate grade needed needs guards in case a desired grade is impossible (negative or > 100 or 1.0)
2. mock grades need a minimum grade of 0
3. mock grades need a maximum grade of 1.0 or 100 (depending on scale)
