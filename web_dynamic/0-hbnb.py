#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

def sort_by_name(obj):
    return obj.name

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/0-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states_obj = sorted(storage.all(State).values(), key=sort_by_name)
    state_city_obj = []
    for state in states_obj:
        cities = sorted(state.cities, key=sort_by_name)
        state_city_obj.append([state, cities])
    amenities = sorted(storage.all(Amenity).values(), key=sort_by_name)
    places = sorted(storage.all(Place).values(), key=sort_by_name)
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())

    return render_template('0-hbnb.html', states=state_city_obj,
                           amenities=amenities, places=places, users=users,
                           cache_id=uuid.uuid4())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
