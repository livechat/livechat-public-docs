# Buttons

> Example usage

```html
<!-- A element -->
<a href="" class="button yellow"><span>Save settings</span></a>

<!-- BUTTON element -->
<button class="button yellow"><span>Save settings</span></button>
```

LiveChat Boilerplate ships with a handful of predefined buttons. Two formats are supported: `<a...>` and `<button...>`. Mind the `<span...>` tag, necessary for both!

| `<a>` tag | `<button>` tag |
|-----------|----------------|
| `<a href="" class="button yellow"><span>...</span></a>` | `<button class="button yellow"><span>...</span></button>`|

## Using buttons

LiveChat Agent App uses a unified color scheme within all the views. Feel free to pick up your favourites, but keep in mind the users got used to particular colors and already associated certain functions with them.

### Colors & functions

| Function | Color   | CSS classes | Preview  |
|----------|---------|-------------|----------|
| save     | {#efa843} | `button yellow`  | <a href="" class="button yellow"><span>Save</span></a>
| continue | {#4285f4} | `button blue`    | <a href="" class="button blue"><span>Continue</span></a>
| delete   | {#ea4335} | `button red`     | <a href="" class="button red"><span>Delete</span></a>
| activate | {#46b776} | `button green`   | <a href="" class="button green"><span>Activate</span></a>
| other    | {#000000} | `button black`   | <a href="" class="button black"><span>Read the docs</span></a>

## Examples

Here are the most common implementations. 

### Save changes

```html
<a href="" class="button yellow"><span>Save changes</span></a>
<span class="cancel">or <a href="">cancel</a></span>
```
<div class="boilerplate-content__example buttons">
	<a href="" class="button yellow"><span>Save changes</span></a>
	<span class="cancel">or <a href="">cancel</a></span>
</div>

### Alternative
```html
<a href="" class="button blue"><span>Log out of this app</span></a>
<span class="alternative">or <a href="">log out of all devices</a></span>
```
<div class="boilerplate-content__example buttons">
	<a href="" class="button blue"><span>Log out of this app</span></a>
	<span class="alternative">or <a href="">log out of all devices</a></span>
</div>

### Delete
```html
<a href="" class="button red"><span>Delete message</span></a>
<span class="cancel">or <a href="">cancel</a></span>
```
<div class="boilerplate-content__example buttons">
	<a href="" class="button red"><span>Delete message</span></a>
	<span class="cancel">or <a href="">cancel</a></span>
</div>

### Switch
```html
<button class="button switch on">
	<span class="on"></span>
	<span class="off"></span>
	<span class="toggle"></span>
</button>
```
<div class="boilerplate-content__example buttons">
	<button class="button switch on">
		<span class="on"></span>
		<span class="off"></span>
		<span class="toggle"></span>
	</button><span class="alternative">Should we notify new users?</span>
</div>