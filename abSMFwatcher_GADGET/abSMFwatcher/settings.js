
function settingsClosing(event) 
{
    if (event.closeAction == event.Action.commit) 
	{	
		if(!event.cancel) 
		{
			saveSettings();
		}
    }
}

function saveSettings()
{
	System.Gadget.Settings.writeString("refreshRate", document.getElementById("refreshRate").value);
	System.Gadget.Settings.writeString("wUrl", document.getElementById("wUrl").value);
	System.Gadget.Settings.writeString("refreshTime", document.getElementById("refreshTime").checked.toString());
}

function restoreSettings()
{
	document.getElementById("refreshRate").value = System.Gadget.Settings.readString("refreshRate");
	document.getElementById("wUrl").value = System.Gadget.Settings.readString("wUrl");
	document.getElementById("refreshTime").checked = (System.Gadget.Settings.readString("refreshTime") == "true") ? true : false;
}

function main() 
{
    System.Gadget.onSettingsClosing = settingsClosing;
	restoreSettings();
}