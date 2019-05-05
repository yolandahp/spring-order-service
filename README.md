# Order Service <!-- omit in toc -->
## Team <!-- omit in toc -->
PBKK C
- Dandy Naufaldi (05111640000011)
- Ferdinand Jason G. (05111640000033)
- Yolanda Hertita P. (05111640000052)

## Table of Contents <!-- omit in toc -->
- [API Docs](#api-docs)
  - [Order](#order)
    - [1. Show all user's orders](#1-show-all-users-orders)
    - [2. Show all user's ongoing orders](#2-show-all-users-ongoing-orders)
    - [3. Show all user's completed orders](#3-show-all-users-completed-orders)
    - [4. Show order details](#4-show-order-details)
    - [5. Create order](#5-create-order)
    - [6. Update order's status](#6-update-orders-status)
  - [Order Details](#order-details)
    - [1. Add new order detail (add menu)](#1-add-new-order-detail-add-menu)
    - [2. Update order detail](#2-update-order-detail)
    - [3. Delete order detail](#3-delete-order-detail)

## API Docs
BASE_URL = `api/v1`
### Order
#### 1. Show all user's orders
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
* **URL**

  <_The URL Structure (path only, no root url)_>

* **Method:**
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `photo_id=[alphanumeric]`

* **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
#### 2. Show all user's ongoing orders
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 3. Show all user's completed orders
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 4. Show order details
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 5. Create order
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 6. Update order's status
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->

### Order Details
#### 1. Add new order detail (add menu)
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 2. Update order detail
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
#### 3. Delete order detail
#### [Back to Table of Contents](#table-of-contents-) <!-- omit in toc -->
