#pragma strict

var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 1000; //speed of turning
var targetAngle : float; 
var myTransform : Transform; //current transform data of this enemy
 
function Awake()
{
    myTransform = transform; //cache transform data for easy access/preformance
}
 
function Start()
{
     target = GameObject.FindWithTag("Player").transform; //target the player
 	transform.localRotation = Quaternion.Euler (0, 90, 0);
}
 
function Update () {
    //rotate to look at the player
   // myTransform.rotation.y = Quaternion.Slerp(myTransform.rotation,Vector2.Angle(myTransform.position,target.position), rotationSpeed*Time.deltaTime);
 	
 	//targetAngle = Vector2.Angle(myTransform.position,target.position);
 	//transform.localRotation = Quaternion.Slerp (Quaternion.Euler (0, 0, 0), Quaternion.Euler (0, 0, targetAngle), rotationSpeed * Time.deltaTime);
	
	transform.LookAt (target, Vector3.right);
	 //Debug.Log(targetAngle);

 
}