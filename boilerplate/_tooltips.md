# Tooltips

Use tooltips to explain particular elements of interface or to provide additional context or details. You can also create a neat onboarding experience using tooltips as a guide elements. 

```html
<div class="menu">
	<span class="app-icon app-icon-settings"></span>
	<div class="small-tooltip small-tooltip--visible">
		<div class="small-tooltip__arrow"></div>
		<div class="small-tooltip__content">Settings</div>
	</div>
</div>
```

<div class="boilerplate-content__example __example--tooltips menu">
	<span class="app-icon app-icon-settings"></span>
	<div class="small-tooltip small-tooltip--visible">
		<div class="small-tooltip__arrow"></div>
		<div class="small-tooltip__content">Settings</div>
	</div>
</div>

You can change the position of a tooltip arrow using these classes:

* `info-tooltip__arrow--left-top`
* `info-tooltip__arrow--right-top`
* `info-tooltip__arrow--top-left`
* `info-tooltip__arrow--top-right`


<div class="boilerplate-content__example my-component">
	<form class="form my-form">
		<p class="form__p">
			<label class="form__label" for="username1">Username</label>
			<input type="text" class="form__input" id="username1">
			<span class="form__explanation">Username has to be outstanding.</span>
		</p>
	</form>
	<div class="info-tooltip my-tooltip">
		<div class="info-tooltip__arrow info-tooltip__arrow--top-left"></div>
		<div class="info-tooltip__cancel">×</div>
		<div class="info-tooltip__content">
			Let us know your name, it's going to look awesome on the home screen!
		</div>
		<div class="info-tooltip__close">
			<a href="#" class="button white"><span>Next</span></a> (<em>1 of 3 steps</em>) 
		</div>
	</div>
</div>