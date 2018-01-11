---
weight: 40
---

# Forms

Form is probably the most basic way of interacting with a user. Make sure it is accessible and self-explanatory. It also helps to break huge forms into separate pieces. Provide validation feedback with predefined `--error` classes.

### Basic form

```html
<form class="form">
	<p class="form__p">
		<label class="form__label" for="message1">Message</label>
		<textarea class="form__textarea" id="message1"></textarea>
	</p>
	<p class="form__p">
		<label class="form__label" for="username1">Username</label>
		<input type="text" class="form__input" id="username1">
		<span class="form__explanation">Your username can consist of the following characters: [a-ZA-Z0-9].</span>
	</p>
	<p class="form__cta">
		<button class="button yellow"><span>Save</span></button>
		<span class="cancel">or <a href="">cancel</a></span>
	</p>
</form>
```

<div class="boilerplate-content__example">
	<form class="form">
		<p class="form__p">
			<label class="form__label" for="message1">Message</label>
			<textarea class="form__textarea" id="message1"></textarea>
		</p>
		<p class="form__p">
			<label class="form__label" for="username1">Username</label>
			<input type="text" class="form__input" id="username1">
			<span class="form__explanation">Your username should be surprising.</span>
		</p>
		<p class="form__cta">
			<button class="button yellow"><span>Save</span></button>
			<span class="cancel">or <a href="">cancel</a></span>
		</p>
	</form>
</div>

### Form with errors

```html
<form class="form">
	<p class="form__p">
		<label class="form__label" for="message2">Message</label>
		<textarea class="form__textarea form__textarea--error" id="message2"></textarea>
		<span class="form__error">Message cannot be empty.</span>
	</p>
	<p class="form__p">
		<label class="form__label" for="username2">Username</label>
		<input type="text" class="form__input form__input--error" id="username2">
		<span class="form__error">Please enter your username.</span>
		<span class="form__explanation">Your username should sound funny.</span>
	</p>
	<p class="form__cta">
		<button class="button yellow"><span>Save</span></button>
		<span class="cancel">or <a href="">cancel</a></span>
		<span class="form__error">Oops! Something went wrong....</span>
	</p>
</form>
```
<div class=" boilerplate-content__example">
	<form class="form">
		<p class="form__p">
			<label class="form__label" for="message2">Message</label>
			<textarea class="form__textarea form__textarea--error" id="message2"></textarea>
			<span class="form__error">Message cannot be empty.</span>
		</p>
		<p class="form__p">
			<label class="form__label" for="username2">Username</label>
			<input type="text" class="form__input form__input--error" id="username2">
			<span class="form__error">Please enter your username.</span>
			<span class="form__explanation">Your username should reflect your attitude.</span>
		</p>
		<p class="form__cta">
			<button class="button yellow"><span>Save</span></button>
			<span class="cancel">or <a href="">cancel</a></span>
			<span class="form__error">Oops! Something went wrong...</span>
		</p>
	</form>
</div>