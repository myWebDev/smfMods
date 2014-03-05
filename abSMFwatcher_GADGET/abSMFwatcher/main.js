
var a = new Array();
var wUrl = '';
var refreshTimer = 5000;
var refreshRate = 0;
var refreshTime = false;
var data;
var now;
var txt = '';
var str = Math.random().toString(36).substring(7);
var loading = document.getElementById("loading");

function init()
{
	if ( typeof(System) != "undefined" )
	{
		System.Gadget.settingsUI = 'settings.html'; //settinds
		settingsGet();
	}
	
	if ( wUrl == '' ) 
	{
		document.getElementById("loading").style.display = 'none';
		document.getElementById("smfInfo").innerHTML = '<b>check settings</b>';
	}
	else {
		document.getElementById("loading").style.display = 'block';
	}
	
	window.setInterval(xmlGet, refreshTimer); //will execute the function every refreshTimer
}

function settingsGet()
{
	if ( typeof(System) != "undefined" )
	{
		if ( System.Gadget.Settings.readString("wUrl") != '' ) 
		{
			wUrl = System.Gadget.Settings.readString("wUrl");
		}
		if ( System.Gadget.Settings.readString("refreshRate") > 0 ) 
		{
			refreshRate = System.Gadget.Settings.readString("refreshRate");
		}	
		if ( System.Gadget.Settings.readString("refreshTime") )
		{
			refreshTime = System.Gadget.Settings.readString("refreshTime");
		}
	}
	else {
		wUrl = 'http://127.0.0.1/forum/watcher.php';
		refreshRate = 600;
	}
}
 
function xmlGet() 
{
	settingsGet();
	
	if ( refreshRate > 0 )
	{ 
		refreshTimer = refreshRate * 1000;
	}
			
	now = new Date();
	now = now.getFullYear() + '/'
		+ (now.getMonth() + 1) + '/' 
		+ now.getDate() +' '
		+ now.getHours() + ':' 
		+ now.getMinutes() + ':' 
		+ now.getSeconds() + ',' 
		+ now.getMilliseconds();

	if ( wUrl != '' )
	{
		
		if (window.XMLHttpRequest)
		{
			xhr=new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
		}
		else {
			xhr=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
		}

		xhr.onreadystatechange=function()
		{
			
			document.getElementById("loading").style.display = 'block';
			
			if (xhr.readyState==4 && xhr.status==200)
			{
				document.getElementById("loading").style.display = 'none';

				xmlDoc = xhr.responseXML;

				a[0] = xmlDoc.getElementsByTagName('num_online')[0].firstChild.nodeValue;
				a[1] = xmlDoc.getElementsByTagName('num_guests_online')[0].firstChild.nodeValue;
				a[2] = xmlDoc.getElementsByTagName('num_users_online')[0].firstChild.nodeValue;
				a[3] = xmlDoc.getElementsByTagName('list_users_online')[0].firstChild.nodeValue;
				
				txt = 
					'total: ' + a[0] + '<br />' 
					+ 'guests: ' + a[1] + '<br />' 
					+ 'users: ' + a[2] +  '<br />'; 
					//+ 'list: ' + a[3];
				
				document.getElementById("smfInfo").innerHTML = 
					txt + '<br />' + 
					wUrl + '<br />' + 
					now;
			}
			else {
				document.getElementById("smfInfo").innerHTML = 'loading: '+now+'<br /><b>wUrl</b> '+wUrl+'<br />refreshRate: '+refreshRate+'<br />refreshTime: '+refreshTime;
			}
		}

		xhr.open('GET', wUrl, true);
		xhr.send();
 
	}
	else {
		document.getElementById("smfInfo").innerHTML = '<b>none</b> '+now;
	}

}
    
