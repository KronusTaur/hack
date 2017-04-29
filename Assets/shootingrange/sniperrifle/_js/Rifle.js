var maxShoot=2;
var gilza:GameObject;
var CurrentShoot=0;
var SniperModeSensitivity=0.25;
var cam:GameObject;
var cam2:GameObject;

private var bullet=1;
private var ShootFlag=true;
private var ReloadFlag=true;

private var SnipFlag=true;

public static var SnipFlag2=true;

private var shoot:GameObject;
shoot=GameObject.Find("Shoot");
shoot.active=false;

gilza.active=false;

var StartPoint:GameObject;
var hit : RaycastHit;

var decal:Transform;
private var decalPos:Vector3;
private var Parent:Transform;

function Update(){
	if ((bullet<=maxShoot) && Input.GetMouseButtonDown (0) && (ShootFlag) && (ReloadFlag)) {		
		ShootFlag=false;
		Shoot();
	}
	
	if ((ReloadFlag) && (ShootFlag) && Input.GetKey (KeyCode.R) ) {
		ReloadFlag=false;
		Reload();
	}
	
	if ((SnipFlag) && (ShootFlag) && (ReloadFlag)){
		if (Input.GetMouseButtonDown (1)) {
			SnipFlag=false;
			var player : GameObject = GameObject.FindWithTag("Player");
			if(SnipFlag2)
			{
				Debug.Log("Sniper mode");
				player.GetComponent("MouseLook").sensitivityX = SniperModeSensitivity;
				player.GetComponent("MouseLook").sensitivityY = SniperModeSensitivity;
			}
			else
			{
				Debug.Log("Normal mode");
				player.GetComponent("MouseLook").sensitivityX = 5;
				player.GetComponent("MouseLook").sensitivityY = 5;
			}
			Snipp();
		}
	}
	
	if (Input.GetKey(KeyCode.T)){
		var decals = GameObject.FindGameObjectsWithTag ("Decal");
		for (var i=0; i<decals.length;i++){
			Destroy(decals[i]);
		}
	}
	
	var forward : Vector3 = StartPoint.transform.TransformDirection(Vector3.forward) ;
    //Debug.DrawRay (StartPoint.transform.position, forward * 100, Color.red);

    if (Physics.Raycast (StartPoint.transform.position, forward, hit, 100.0)) {
        //decalPos=hit.collider.transform.position;
		decalPos=hit.point;
		Parent=hit.collider.transform;
    }
}

function Shoot(){
		
		GetComponent.<Animation>().Play("shoot");
		
		shoot.active=true;
		yield WaitForSeconds (0.03);
		shoot.active=false;
		
		var clone=Instantiate(decal,decalPos, Parent.rotation);
		clone.transform.parent=Parent;
		clone.tag="Decal";
		
		GameObject.FindWithTag("RifleShot").GetComponent.<AudioSource>().Play();
		yield WaitForSeconds (GetComponent.<Animation>()["shoot"].length-0.1);
	
		temp=false;
	
		if (!SnipFlag2) {
			temp=true;
			SnipFlag=false;
			Snipp();
		}

		if (bullet!=maxShoot) {
				GameObject.FindWithTag("RifleReload").GetComponent.<AudioSource>().Play();
				GetComponent.<Animation>().Play("onlyrel");
				yield WaitForSeconds (0.2);
				gilza.active=true;
				
				yield WaitForSeconds (GetComponent.<Animation>()["onlyrel"].length-0.2);
				gilza.active=false;
				GetComponent.<Animation>().Play("idle");
		}
		CurrentShoot=bullet;
		bullet++;
		
		if (temp) {
			SnipFlag=false;
			Snipp();
		}	
	
		ShootFlag=true;

}

function Reload(){
	temp=false;
	
	if (!SnipFlag2) {
		temp=true;
		SnipFlag=false;
		Snipp();
	}

	GetComponent.<Animation>().Play("reload");
	GameObject.FindWithTag("RifleMagazine").GetComponent.<AudioSource>().Play();
	
	yield WaitForSeconds (1.0);
	
	gilza.active=true;
	GameObject.FindWithTag("RifleReload").GetComponent.<AudioSource>().Play();
	yield WaitForSeconds (GetComponent.<Animation>()["reload"].length-1.0);
	GetComponent.<Animation>().Play("idle");
	gilza.active=false;
	
	if (temp) {
		SnipFlag=false;
		Snipp();
	}	

	bullet=1;
	CurrentShoot=0;
	ReloadFlag=true;
}


function Snipp(){
	cam.SetActiveRecursively(!SnipFlag2);
	cam2.SetActiveRecursively(SnipFlag2);
	
	SnipFlag2=!SnipFlag2;

	yield WaitForSeconds (0.2);
	SnipFlag=true;
}