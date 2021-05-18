from quart import Quart
import quart_cors
from random import randint
import os
import binascii
from datetime import datetime

app = Quart(__name__)
app = quart_cors.cors(app, allow_origin="*")

def random_public_key():
    prefix = randint(2, 3)
    return binascii.hexlify(prefix.to_bytes(1, 'little') + os.urandom(32)).decode()

def generate_votes(amount):
    votes = [10]
    for _ in range(amount):
        votes.append(votes[-1] + randint(50, 250))
    votes.sort(reverse=True)
    return votes

@app.route('/votes')
async def total_votes():

    x = [0]
    y = [0]
    for _ in range(100):
        x.append(x[-1] + randint(1, 100))
        y.append(y[-1] + randint(-15, 100))

    return {
        "treshhold": 1_000,
        "block_index": x,
        "vote_count": y
    }


@app.route('/registered_candidates')
async def candidates():

    x = [0]
    y = [0]

    # generate total registered candidates data
    for _ in range(50):
        x.append(x[-1] + randint(1, 100))
        y.append(y[-1] + randint(-15, 100))

    # generate top 25 candidates table data
    candidate_votes = generate_votes(25)
    fake_public_keys = []
    for _ in range(25):
        fake_public_keys.append(random_public_key())

    candidate_votes.sort(reverse=True)
    candidates = []
    for i, (key, votes) in enumerate(zip(fake_public_keys, candidate_votes)):
        candidates.append({"rank": i + 1, "public_key": key, "votes": votes})

    return {
        "block_index": x,
        "candidate_count": y,
        "candidates": candidates
        }

@app.route('/committee')
async def committee():
    keys = []
    for _ in range(21):
        keys.append(random_public_key())

    votes = generate_votes(21)
    committee = []
    for key, votes in zip(keys, votes):
        committee.append({key: votes})
    return {"committee": committee}

@app.route("/candidate/<publickey>")
async def candidate(publickey):

    return {
        "public_key": publickey,
        "registration_date": datetime.now(),
        "votes": randint(200, 300),
        "unique_voters": randint(1, 10),
        "in_committee": True if randint(-5,5) >= 0 else False,
        "position": randint(1, 30),
        "total_candidates": randint(200, 300)
    }

if __name__ == '__main__':
    app.run(debug=True)
