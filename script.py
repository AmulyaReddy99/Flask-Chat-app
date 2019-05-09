from flask import Flask, render_template, request

app = Flask(__name__)

language='hi'
@app.route('/')
def index():
	return render_template('index.html')


@app.route('/msg/<msg>', methods = ['POST', 'GET'])
def identify_lang(msg):
	from textblob import TextBlob
	global language
	msg = TextBlob(msg)
	msg = msg.correct()
	language = msg.detect_language()
	return language


@app.route('/reply/<reply>', methods = ['POST', 'GET'])
def reply(reply):
	from textblob import TextBlob
	reply = TextBlob(reply)
	print("-------->\n",reply)
	reply = reply.translate(to=language)
	print(reply)
	return str(reply)


if __name__=='__main__':
	app.run()


