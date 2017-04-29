public static var ShowGUI=false;
var instr:Texture2D;
private var emptyStyle:GUIStyle;
emptyStyle=new GUIStyle();

private var CanAnimate=true;
private var CurrentTarget=0;

private var targets:GameObject[];
targets=new GameObject[8];

function Start(){
	for (var i=1; i<=7; i++){
		targets[i]=GameObject.Find("target 0"+i);
	}
}

function OnGUI () {
	if (ShowGUI) {
		GUI.Box(Rect(50,Screen.height-instr.height-50,instr.width,instr.height),instr,emptyStyle);
	}
}

function OnTriggerStay(obj:Collider){
	if (Rifle.SnipFlag2){
			ShowGUI=true;
		}
	else {
		ShowGUI=false;
	}	

	switch (obj.name) {
		case	"collider1": CurrentTarget=1; break;
		case	"collider2": CurrentTarget=2; break;
		case	"collider3": CurrentTarget=3; break;
		case	"collider4": CurrentTarget=4; break;
		case	"collider5": CurrentTarget=5; break;
		case	"collider6": CurrentTarget=6; break;
		case	"collider7": CurrentTarget=7; break;
	}
	
}

function OnTriggerExit(){
	ShowGUI=false;
}

function Update(){
	if ((CurrentTarget!=0) &&(Input.GetKey(KeyCode.F))){
		ForwardTarget();
	}
	if ((CurrentTarget!=0)&&(Input.GetKey(KeyCode.B))){
		BackTarget();
	}	
}


function ForwardTarget(){
	 if (!targets[CurrentTarget].GetComponent.<Animation>().IsPlaying("forward"+CurrentTarget)  && 
			!targets[CurrentTarget].GetComponent.<Animation>().IsPlaying("backward"+CurrentTarget) &&
			(targets[CurrentTarget].transform.position.x<50))
		targets[CurrentTarget].GetComponent.<Animation>().Play("forward"+CurrentTarget);

}

function BackTarget(){
	if (!targets[CurrentTarget].GetComponent.<Animation>().IsPlaying("forward"+CurrentTarget)  && 
			!targets[CurrentTarget].GetComponent.<Animation>().IsPlaying("backward"+CurrentTarget)&&
			(targets[CurrentTarget].transform.position.x>50))
	targets[CurrentTarget].GetComponent.<Animation>().Play("backward"+CurrentTarget);

}