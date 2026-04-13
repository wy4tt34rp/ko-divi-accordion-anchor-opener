KO – DIVI ACCORDION ANCHOR OPENER
=================================

WHAT IT DOES
------------
This plugin lets you create links that OPEN a specific Divi Accordion item.

It supports TWO methods:
1) OPEN BY ANCHOR / ID:
   - Link:  #priority-placement
   - Opens the accordion item that CONTAINS an element with id="priority-placement"

2) OPEN BY ACCORDION ITEM TITLE (NO ID NEEDED):
   - Link:  #ko-accordion=Priority%20Placement
   - Opens the accordion item whose TITLE TEXT matches "Priority Placement"

HOW TO USE (RECOMMENDED: TITLE METHOD)
-------------------------------------
Inside your content (even inside another accordion item), create a link like:

<a href="#ko-accordion=Priority%20Placement">Priority Placement</a>

Notes:
- The title match is case-insensitive and ignores extra spaces.
- If you have multiple accordion items with the SAME title on a page, it will open the first match.

HOW TO USE (ANCHOR / ID METHOD)
-------------------------------
If your Divi UI does not expose "CSS ID & Classes" for accordion items, you can still use IDs by adding a tiny anchor inside the TARGET accordion item's content:

<span id="priority-placement"></span>

Then link to it:
<a href="#priority-placement">Priority Placement</a>

DIRECT LINKS
------------
You can also link directly to a page using the hash:

https://example.com/enrollment/#ko-accordion=Priority%20Placement
(or)
https://example.com/enrollment/#priority-placement

VERSION
-------
1.1.0
