## Documentation  
#### Table of Contents
+ [Test Module](#test-module)
+ [Second Test Module](#second-test-module)



## Test Module  $\color{green}\tiny \texttt {REST}\color{blue}_{\texttt {API}}$

<p>A module to test the badan package</p>


#### *APIs*:
<details>
<summary><b>Test Api 1</b></summary>
<p>the first test api</p>

**Method**: ***Post***  
**Url**: `/test-module/test-module/test/1`

***Body***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
	param6:Array<boolean>
	param7:{
		subparam1:string
		subparam2:number
	}
	param8:Array<undefined>
}
```
</details>
<details>
<summary><b>Test Api 2</b></summary>
<p>the second test api</p>

**Method**: ***Get***
**Url**: `/test-module/test-module/test/2`

***Body***:
```
{
	param6:Array<boolean>
	param7:Array<{
			subparam1:string
			subparam2:number
		}>
	param8:Array<undefined>
}
```
***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>





## Second Test Module  <t style="color:green;font-size:60%;font-family:courier;">REST<t style="color:blue;font-size:80%">Api</t></t>
<p>A module to test the badan package</p>

#### Table of Contents
+ [APIs](#apis)
+ [Sub Module](#sub-module)
+ [Second Test Sub Module](#second-test-sub-module)

#### *APIs*:
<details>
<summary><b>Test Api 3</b></summary>
<p>the thered test api</p>

**Method**: ***Get***
**Url**: `/test-module/test-module/test/3`

***Body***:
```
{
	param6:Array<boolean>
	param7:Array<{
			subparam1:string
			subparam2:number
		}>
	param8:Array<undefined>
}
```
***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>
<details>
<summary><b>Test Api 4</b></summary>
<p>the forth test api</p>

**Method**: ***Put***
**Url**: `/test-module/test-module/test/4`

***Body***:
```
{
	param6:Array<boolean>
	param7:Array<{
			subparam1:string
			subparam2:number
		}>
	param8:Array<undefined>
}
```
***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>



## Sub Module  <t style="color:green;font-size:60%;font-family:courier;">REST<t style="color:blue;font-size:80%">Api</t></t>
<p>A module to test the badan package</p>


#### *APIs*:
<details>
<summary><b>Test Api 5</b></summary>
<p>the 5th test api</p>

**Method**: ***Get***
**Url**: `/test-module/test-module/test-module/test-module/test-module/:test/5`

***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>
<details>
<summary><b>Test Api 6</b></summary>
<p>the 6th test api</p>

**Method**: ***Put***
**Url**: `/test-module/test-module/test-module/test-module/test-module/test/6`

***Body***:
```
{
	param6:Array<boolean>
	param7:Array<{
			subparam1:string
			subparam2:number
		}>
	param8:Array<undefined>
}
```
***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>




## Second Test Sub Module  <t style="color:green;font-size:60%;font-family:courier;">REST<t style="color:blue;font-size:80%">Api</t></t>
<p>A module to test the badan package</p>


#### *APIs*:
<details>
<summary><b>Test Api 7</b></summary>
<p>the 7th test api</p>

**Method**: ***Get***
**Url**: `/test-module/test-module/test-module/test-module/test-module/:test/7`

***Query***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
}
```
</details>
<details>
<summary><b>Test Api 8</b></summary>
<p>the 8th test api</p>

**Method**: ***Put***
**Url**: `/test-module/test-module/test-module/test-module/test-module/test/8`

***Body***:
```
{
	param1:string
	param2:number
	param3:boolean
	param4:"male"
	param5:undefined
	param6:Array<boolean>
	param7:{
		subparam1:string
		subparam2:number
	}
	param8:Array<undefined>
}
```
</details>








