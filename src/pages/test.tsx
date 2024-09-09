import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMounted } from "@/hooks/use-mounted";
import React, { useState, useSyncExternalStore } from "react";

class Counter {
  constructor(onFire) {
    this.count = 0;
    this.onFire = onFire;
    this.listeners = [];
  }

  emitChange() {
    this.listeners.forEach((listener) => listener());
  }

  // addListener(listener)
  subscribe(listener) {
    // this.listeners.push(listener);
    this.listeners = [...listeners, listener];

    // return () => {
    //   listeners = listeners.filter((l) => l !== listener);
    // };
  }

  getSnapshot() {
    return {
      count: this.count,
      list: this.list,
    };
  }

  removeEventListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  increment() {
    this.count++;
    this.notif();
    // this.onFire();
  }

  decrement() {
    this.count--;
    this.notif();
    // this.onFire();
  }

  getCount() {
    return this.count;
  }

  addToList(item) {
    this.list.push(item);
    this.notif();
    // this.onFire();
  }

  getList() {
    // this.onFire();
    return this.list;
  }

  notif() {
    this.listeners.forEach((fn) => fn());
  }
}

export default function TestPage() {
  const mounted = useMounted();

  const [c, setC] = useState(0);

  const [counterClass] = useState(new Counter(onFire));

  // const counter = useSyncExternalStore(
  //   counterClass.subscribe,
  //   counterClass.getSnapshot,
  // );

  function onFire() {
    console.log("Fired");
    // setC(c + 1);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page, you can remove this file if you want.</p>
      <div>
        {/* {counter.getCount()}
        list: {counter.getList().length}
        <Button onClick={() => counter.addToList(`item ` + Math.random())}>
          Add to list
        </Button>
        <Button
          onClick={() => {
            counter.increment();
            setC(c + 1);
          }}
        >
          Increment
        </Button>
        <Button
          onClick={() => {
            counter.decrement();
            setC(c - 1);
          }}
        >
          Decrement
        </Button> */}
        <ClassesStateWithComponent />
      </div>
    </div>
  );
}

class UserPlugin {
  contructor() {
    this.type = "plugin";
    this.version = "1.0.0";
    this.environment = "production";

    this.users = [];

    this.listeners = [];
  }

  // emitChange() {
  //   this.listeners.forEach((listener) => listener());
  // }

  getType() {
    return this.type;
  }

  getVersion() {
    return this.version;
  }

  getEnvironment() {
    return this.environment;
  }

  setType(type) {
    this.type = type;
  }

  setVersion(version) {
    this.version = version;
  }

  setEnvironment(environment) {
    this.environment = environment;
  }

  addListener(listener) {
    // only add current listeners to the new array if its an array and has items, otherswise just add the new listener
    const arr =
      Array.isArray(this.listeners) && this.listeners.length > 0
        ? [...this.listeners, listener]
        : [listener];
    this.listeners = arr;

    // this.listeners = [...this.listeners, listener];
    // this.listeners.push(listener);
  }

  removeEventListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  getSnapshot() {
    return {
      users: this.users,
    };
  }

  notify() {
    console.log("Notifying", this.listeners);
    this.listeners.forEach((fn) => fn());
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  createUser(id, name, role) {
    const user = new User(id, name, role);

    const arr =
      Array.isArray(this.users) && this.users.length > 0
        ? [...this.users, user]
        : [user];

    this.users = arr;
    this.notify();
    return user;
  }

  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.notify();
  }

  // updateUser(id, data) {
  //   const user = this.getUserById(id);
  //   if (!user) {
  //     return null;
  //   }

  //   const updatedUser = { ...user, ...data };

  //   this.users = this.users.map((user) =>
  //     user.id === id ? updatedUser : user,
  //   );
  //   this.notify();
  //   return updatedUser;
  // }
}

class User {
  constructor(id, name, role: "admin" | "user") {
    this.id = id;
    this.name = name;
    this.role = role;
    this.createdAt = new Date();
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  update(data) {
    const { id, name, role } = data;
    this.id = id;
    this.name = name;
    this.role = role;
  }
}

function ClassesStateWithComponent() {
  const userPlugin = React.useMemo(() => new UserPlugin(), []);
  // const [userPlugin, setUserPlugin] = useState(() => new UserPlugin());

  const [render, setRender] = useState(0);

  function forceRender() {
    setRender((prev) => prev + 1);
  }

  React.useEffect(() => {
    userPlugin.addListener(updateUsers);

    return () => {
      userPlugin.removeEventListener(updateUsers);
    };
  }, [userPlugin]);

  function updateUsers() {
    setUsers([...userPlugin.getUsers()]);
  }

  const [users, setUsers] = useState(userPlugin.getUsers() ?? []);

  function generateRandomId() {
    return Math.random().toString(36).substring(7);
  }

  const [formValues, setFormValues] = useState({
    id: generateRandomId(),
    name: "",
    role: "",
  });

  function resetForm() {
    setFormValues({
      id: generateRandomId(),
      name: "",
      role: "",
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { id, name, role } = formValues;
    userPlugin.createUser(id, name, role);
    // setUsers([...userPlugin.getUsers()]); // Create a new array to trigger re-render
    resetForm();
  }

  function handleDeleteUser(id) {
    userPlugin.deleteUser(id);
    // setUsers([...userPlugin.getUsers()]);
  }

  return (
    <div className="w-fit max-w-sm rounded border bg-neutral-100 p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          name="id"
          placeholder="User ID"
          value={formValues.id}
          onChange={handleInputChange}
          required
        />
        <div className="flex w-full gap-2">
          <Input
            type="text"
            name="name"
            placeholder="User Name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="role"
            placeholder="User Role"
            value={formValues.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={forceRender} variant="material">
            forceRender
          </Button>

          <Button type="submit" variant="dark" className="flex-1">
            Create User
          </Button>
        </div>
      </form>
      <div>
        <div className="my-2 flex flex-col gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-sm border bg-white p-3"
            >
              <div>{user.id}</div>
              <div>{user.name}</div>
              <div>{user.role}</div>
              <div>{formatTime(user.createdAt)}</div>
              <Button
                onClick={() => handleDeleteUser(user.id)}
                variant="destructive-outline"
                size="xs"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
