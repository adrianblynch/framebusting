# Framebusting

A simple demo to show the use of `X-Frame-Options` in helping prevent clickjacking.

## Install

`npm install`

`node index.js 3001`

`node index.js 3002`

Browse to [The Good Frame page](http://localhost:3001/good-frame.html) then browse to [The Bad Frame page](http://localhost:3002/bad-frame.html).

## Results

Pages on the good site are served up with a `X-Frame-Options` header set to `sameorigin`.

When the bad site tried to load a page from the good site in a frame, to clickjack, the browse prevents this.

[<img src="images/framebusting.png">](images/framebusting.png)

The good site can still load its own pages into frames.
