(function() {
	
	 /**
	   * Variables
	   */
	  var user_id = '1111';
	  var user_fullname = 'John';
	/**
	   * Initialize major event handlers
	   */
	  function init() {
	    // register event listeners
		document.querySelector('#login-form-btn').addEventListener('click', onSessionInvalid);
	    document.querySelector('#login-btn').addEventListener('click', login);
	    document.querySelector('#register-form-btn').addEventListener('click', showRegisterForm);
	    document.querySelector('#register-btn').addEventListener('click', register);
	    validateSession();
	    onSessionValid({"user_id":"1111","name":"John Smith","status":"OK"});
	  }
	
	  
	  /**
	   * Session
	   */
	  function validateSession() {
	    onSessionInvalid();
	    // The request parameters
	    var url = './login';
	    var req = JSON.stringify({});

	    // display loading message
	    showLoadingMessage('Validating session...');

	    // make AJAX call
	    ajax('GET', url, req,
	      // session is still valid
	      function(res) {
	        var result = JSON.parse(res);

	        if (result.status === 'OK') {
	          onSessionValid(result);
	        }
	      });
	  }
	  
	  function onSessionValid(result) {
		    user_id = result.user_id;
		    user_fullname = result.name;

		    var loginForm = document.querySelector('#login-form');
		    var registerForm = document.querySelector('#register-form');
		    var itemNav = document.querySelector('#item-nav');
		    var itemList = document.querySelector('#item-list');
		    var avatar = document.querySelector('#avatar');
		    var welcomeMsg = document.querySelector('#welcome-msg');
		    var logoutBtn = document.querySelector('#logout-link');

		    welcomeMsg.innerHTML = 'Welcome, ' + user_fullname;

		    showElement(itemNav);
		    showElement(itemList);
		    showElement(avatar);
		    showElement(welcomeMsg);
		    showElement(logoutBtn, 'inline-block');
		    hideElement(loginForm);
		    hideElement(registerForm);
		  }
	  
	  function onSessionInvalid() {
		    var loginForm = document.querySelector('#login-form');
		    var registerForm = document.querySelector('#register-form');
		    var itemNav = document.querySelector('#item-nav');
		    var itemList = document.querySelector('#item-list');
		    var avatar = document.querySelector('#avatar');
		    var welcomeMsg = document.querySelector('#welcome-msg');
		    var logoutBtn = document.querySelector('#logout-link');

		    hideElement(itemNav);
		    hideElement(itemList);
		    hideElement(avatar);
		    hideElement(logoutBtn);
		    hideElement(welcomeMsg);
		    hideElement(registerForm);

		    clearLoginError();
		    showElement(loginForm);
		  }

		  function hideElement(element) {
		    element.style.display = 'none';
		  }

		  function showElement(element, style) {
		    var displayStyle = style ? style : 'block';
		    element.style.display = displayStyle;
		  }
		  
		  function showRegisterForm() {
		    var loginForm = document.querySelector('#login-form');
		    var registerForm = document.querySelector('#register-form');
		    var itemNav = document.querySelector('#item-nav');
		    var itemList = document.querySelector('#item-list');
		    var avatar = document.querySelector('#avatar');
		    var welcomeMsg = document.querySelector('#welcome-msg');
		    var logoutBtn = document.querySelector('#logout-link');

		    hideElement(itemNav);
		    hideElement(itemList);
		    hideElement(avatar);
		    hideElement(logoutBtn);
		    hideElement(welcomeMsg);
		    hideElement(loginForm);
		    
		    clearRegisterResult();
		    showElement(registerForm);
		  }  
	// -----------------------------------
	  // Login
	  // -----------------------------------

	  function login() {
	    var username = document.querySelector('#username').value;
	    var password = document.querySelector('#password').value;
	    password = md5(username + md5(password));

	    // The request parameters
	    var url = './login';
	    var req = JSON.stringify({
	      user_id : username,
	      password : password,
	    });

	    ajax('POST', url, req,
	      // successful callback
	      function(res) {
	        var result = JSON.parse(res);

	        // successfully logged in
	        if (result.status === 'OK') {
	          onSessionValid(result);
	        }
	      },

	      // error
	      function() {
	        showLoginError();
	      },
	      true);
	  }

	  function showLoginError() {
	    document.querySelector('#login-error').innerHTML = 'Invalid username or password';
	  }

	  function clearLoginError() {
	    document.querySelector('#login-error').innerHTML = '';
	  }

	// -----------------------------------
	  // Register
	  // -----------------------------------

	  function register() {
	    var username = document.querySelector('#register-username').value;
	    var password = document.querySelector('#register-password').value;
	    var firstName = document.querySelector('#register-first-name').value;
	    var lastName = document.querySelector('#register-last-name').value;
	    
	    if (username === "" || password == "" || firstName === "" || lastName === "") {
	    	showRegisterResult('Please fill in all fields');
	    	return
	    }
	    
	    if (username.match(/^[a-z0-9_]+$/) === null) {
	    	showRegisterResult('Invalid username');
	    	return
	    }
	    
	    password = md5(username + md5(password));

	    // The request parameters
	    var url = './register';
	    var req = JSON.stringify({
	      user_id : username,
	      password : password,
	      first_name: firstName,
	      last_name: lastName,
	    });

	    ajax('POST', url, req,
	      // successful callback
	      function(res) {
	        var result = JSON.parse(res);

	        // successfully logged in
	        if (result.status === 'OK') {
	        	showRegisterResult('Succesfully registered');
	        } else {
	        	showRegisterResult('User already existed');
	        }
	      },

	      // error
	      function() {
	    	  showRegisterResult('Failed to register');
	      },
	      true);
	  }

	  function showRegisterResult(registerMessage) {
	    document.querySelector('#register-result').innerHTML = registerMessage;
	  }

	  function clearRegisterResult() {
	    document.querySelector('#register-result').innerHTML = '';
	  }
	  
	  
	/**
	 * Initialize major event handlers
	 */
	function init() {
		// register event listeners

		document.querySelector('#book-a-laundry-btn').addEventListener('click',
				BookALaundry);
		document.querySelector('#my-laundry-room-btn').addEventListener(
				'click', MyLaundryRoom);
	}

	// -----------------------------------
	// Helper Functions
	// -----------------------------------

	/**
	 * A helper function that makes a navigation button active
	 * 
	 * @param btnId -
	 *            The id of the navigation button
	 */

	function activeBtn(btnId) {
		var btns = document.querySelectorAll('.main-nav-btn');

		// deactivate all navigation buttons
		for (var i = 0; i < btns.length; i++) {
			btns[i].className = btns[i].className.replace(/\bactive\b/, '');
		}

		// active the one that has id = btnId
		var btn = document.querySelector('#' + btnId);
		btn.className += ' active';
	}

	function showLoadingMessage(msg) {
		var itemList = document.querySelector('#machine_list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> '
				+ msg + '</p>';
	}

	function showWarningMessage(msg) {
		var itemList = document.querySelector('#machine_list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> '
				+ msg + '</p>';
	}

	function showErrorMessage(msg) {
		var itemList = document.querySelector('#machine_list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> '
				+ msg + '</p>';
	}

	/**
	 * A helper function that creates a DOM element <tag options...>
	 * 
	 * @param tag
	 * @param options
	 * @returns {Element}
	 */
	function $create(tag, options) {
		var element = document.createElement(tag);
		for ( var key in options) {
			if (options.hasOwnProperty(key)) {
				element[key] = options[key];
			}
		}
		return element;
	}

	/**
	 * AJAX helper
	 * 
	 * @param method -
	 *            GET|POST|PUT|DELETE
	 * @param url -
	 *            API end point
	 * @param data -
	 *            request payload data
	 * @param successCallback -
	 *            Successful callback function
	 * @param errorCallback -
	 *            Error callback function
	 */
	function ajax(method, url, data, successCallback, errorCallback) {
		var xhr = new XMLHttpRequest();

		xhr.open(method, url, true);

		xhr.onload = function() {
			if (xhr.status === 200) {
				successCallback(xhr.responseText);
			} else {
				errorCallback();
			}
		};

		xhr.onerror = function() {
			console.error("The request couldn't be completed.");
			errorCallback();
		};

		if (data === null) {
			xhr.send();
		} else {
			xhr.setRequestHeader("Content-Type",
					"application/json;charset=utf-8");
			xhr.send(data);
		}
	}

	// BOOK A LAUNDRY
	function BookALaundry() {
		activeBtn('book-a-laundry-btn');

		// The request parameters
		var url = './allMachineStatus';
		var data = null;

		showLoadingMessage('Loading washing machine...');

		// make AJAX call
		ajax('GET', url, data,
		// successful callback
		function(res) {
			var items = JSON.parse(res);
			if (!items || items.length === 0) {
				showWarningMessage('No washing machine.');
			} else {
				listItems(items);
			}
		},
		// failed callback
		function() {
			showErrorMessage('Cannot load washing machine.');
		});

	}

	function changeMachineState(machineID) {
		var btn = document.querySelector('#btn' + machineID);
		btn.innerHTML = 'BOOKED';
		btn.style.backgroundColor = "red";
	}

	// my laundry room
	function MyLaundryRoom() {
		activeBtn('my-laundry-room-btn');
		var itemList = document.querySelector('#machine_list');
		itemList.innerHTML = 'hhhhh';
	}
	// -------------------------------------
	// Create item list
	// -------------------------------------

	/**
	 * List washing machine base on the data received
	 * 
	 * @param items -
	 *            An array of item JSON objects
	 */
	function listItems(items) {
		var itemList = document.querySelector('#machine_list');
		itemList.innerHTML = ''; // clear current results

		for (var i = 0; i < items.length; i++) {
			addItem(itemList, items[i]);
		}
	}

	function addItem(itemList, item) {
		// create the <div> tag and specify the id and class attributes
		var machine_Id = item.machineId;
		var machine = $create('div', {
			id : 'machine-' + machine_Id,
			className : 'machine'
		});

		// item image
		var machinephoto = $create('div');

		if (item.image_url) {
			machinephoto.appendChild($create('img', {
				src : item.image_url
			}));
		} else {
			machinephoto
					.appendChild($create(
							'img',
							{
								src : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3967731919,3759632002&fm=26&gp=0.jpg'
							}));
		}
		machine.appendChild(machinephoto);

		// machine-info
		var status = $create('div');

		// book button
		var block0 = $create('br');
		var book_btn = $create('button', {
			id : 'btn' + machine_Id,
			className : 'book_btn'
		});
		book_btn.innerHTML = 'BOOK';

		book_btn.onclick = function() {
			changeMachineState(machine_Id);
		};

		status.appendChild(book_btn);

		var block1 = $create('br');
		// machine number
		var machine_number = $create('span');
		machine_number.appendChild(block0);
		machine_number.innerHTML = 'Machine ' + machine_Id;
		machine_number.appendChild(block1);
		status.appendChild(machine_number);

		var block2 = $create('br');

		// book status
		var book_status = $create('span');
		var machine_state = item.state;
		if (machine_state == 1)
			book_status.innerHTML = 'Status: Ruuning';
		if (machine_state == 0)
			book_status.innerHTML = 'Status: Available';
		if (machine_state == 3)
			book_status.innerHTML = 'Status: Booked';
		book_status.appendChild(block2);
		status.appendChild(book_status);

		// waiting_time
		var waiting_time = $create('span', {
			className : 'waiting_time',
		});
		waiting_time.innerHTML = 'Estimate Waiting Time: ' + item.timeLeft
				+ ' minutes';
		status.appendChild(waiting_time);

		machine.appendChild(status);
		itemList.appendChild(machine);

	}

	init();// 函数入口

})();
