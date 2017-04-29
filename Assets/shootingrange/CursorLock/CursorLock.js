private var cursorLock = true;
function OnMouseDown () {
    // Lock the cursor
	cursorLock = true;
}

function Start()
{
	//Remove cursor and lock cursor in Game Window
	Screen.lockCursor = true;
}

function Update () {
    // In standalone player we have to provide our own key
    // input for unlocking the cursor
    if (Input.GetKeyDown ("escape"))
	{
		cursorLock = false;
	}
	Screen.lockCursor = cursorLock;
}