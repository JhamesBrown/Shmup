#pragma strict
var speed : int = 10;
function Start () {

}

function Update () {
	
	transform.Translate(Vector2(0,(-1) * speed * Time.deltaTime));
}