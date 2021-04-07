# RR-API-Test

This system is used to test and verify the Rec.net private API contains the same information from day to day.  Since the private API of Rec.net is not maintained in a way to be consumed by 3rd party developers this system will allow any person to be alerted to changes that may have taken place in it.

## Test Categories
Each set of tests is broken up into these major categories:
 - [GET] [NoAuth] ImageInformation
    -- Image Comments
        --- Testing Entire Response
    -- Image Feed (of a given user)
        --- Testing Entire Response
    -- Image Cheers
        --- Testing Entire Response
    -- Player Images (from a given user)
        --- Testing Entire Response
    -- Image from Event
        --- Testing Entire Response
    -- Images taken in a Room
        --- Testing Entire Response
    -- Global Images (Rec.net front page)
        --- Testing URL parameters and object length/values


All tests will run twice a day.  Once in the morning and once at night.  I plan to test every possible URI of rec.net including all URI's that require authentication.

While slower than tests asyncronously I have developed it to run this way to prevent an over load on rec.net which results in closed connections.

## Result Output
All output from scheduled tests will show a single message for each major category.  This message will be displayed as a embed inside of a Discord message.  If 1 or more tests from a category then it will show up as failed (Red).  If all tests pass then the message will show up as passed (Green).

## Test Results
Most tests will compare the JSON response from a URI to that of an expected results file stored on disk.  For other calls that are time/date sensetive I will be verifing that each object is present on the response (including length).