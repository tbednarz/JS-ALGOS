const util = require("util");

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}

LinkedList.prototype.insertAtBeginning = function(data) {
  // A newNode object is created with property data and next = null

  let newNode = new Node(data);

  // The pointer next is assigned head pointer so that both pointers now point at the same node;

  newNode.next = this.head;

  //as we are inserting at the beginning the head pointer needs to now point at the newNode

  this.head = newNode;

  return this.head;
};

/**                 HEAD
 *                   \/
 *  [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]---> [40][NEXT]--->NULL
 *
 * AFTER INSERT AT BEGINING
 *
 *  HEAD
 *   \/
 *  [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]---> [40][NEXT]--->NULL
 *
 */

LinkedList.prototype.insertAtEnd = function(data) {
  // a newNode object is created with property data and next = null;

  let newNode = new Node(data);

  //when head = null ex. list is empty, then head itself with point to the new node

  if (!this.head) {
    this.head = newNode;
    return this.head;
  }

  //else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tails next pointer

  let tail = this.head;
  while (tail.next !== null) {
    tail = tail.next;
  }
  tail.next = newNode;
  return this.head;
};

/**  HEAD                                          TAIL
 *    \/                                            \/            NEWNODE
 *  [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]---> [40][NEXT]    [DATA][NEXT]-->NULL
 *
 * AFTER INSERT AT END
 *
 *  HEAD                                                         TAIL
 *   \/                                                           \/
 *  [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]---> [40][NEXT]--->[DATA][NEXT]--->NULL
 *
 */

LinkedList.prototype.getAt = function(index) {
  //initialize counter at beginning of list

  //use the head as the starting node
  //then while there is a node, if the counter matches the index given
  //return that node
  //if not increment counter and set node to the next node in list and return null
  let counter = 0;
  let node = this.head;
  while (node) {
    if (counter === index) {
      return node;
    }
    counter++;
    node = node.next;
  }
  return null;
};

/**
 * getAt(3)
 *
 *                                                   \/
 *  HEAD 0               1             2             3             4   TAIL
 *   \/                                                                \/
 *  [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]---> [40][NEXT]--->[DATA][NEXT]--->NULL
 *
 */

LinkedList.prototype.insertAt = function(data, index) {
  //if the list is empty set the new data as the head

  if (!this.head) {
    this.head = new Node(data);
    return;
  }

  //if new node needs to be inserted at the front of the list *before the head

  if (index === 0) {
    this.head = new Node(data, this.head);
    return;
  }
  //otherwise use getAt to find the previous node
  const previous = this.getAt(index - 1);
  let newNode = new Node(data);
  newNode.next = previous.next;
  previous.next = newNode;
  return this.head;
};
/** insertAt(2)
 *       0             1             2              3               4
 * [DATA][NEXT]--->[15][NEXT]---->[7][NEXT]    [40][NEXT]--->[DATA][NEXT]--->NULL
*                                           ||
                                            ||
                                        [DATA][NEXT]
                                        2.next becomes this nodes data
                                        this nodes next becomes 3.data
 * 
 */

LinkedList.prototype.deleteFirstNode = function() {
  //if there is no head that means the list is empty so just return
  if (!this.head) {
    return;
  }
  //else set the head to be the head.next and return head
  this.head = this.head.next;
  return this.head;
};

LinkedList.prototype.deleteLastNode = function() {
  //if the list is empty return null
  if (!this.head) {
    return null;
  }
  //if there is only a head, set head to null and return
  if (!this.head.next) {
    this.head = null;
    return;
  }
  //otherwise make two pointers *previous set to the head and *tail set to head.next
  //while tail.next contains data cycle through until it does by changing previous to the tail and previous to the new tails next pointer
  let previous = this.head;
  let tail = this.head.next;
  while (tail.next !== null) {
    previous = tail;
    tail = tail.next;
  }
  //once the while loop has stopped, set previous.next to null
  //then return the head;??
  previous.next = null;
  return this.head;
};

LinkedList.prototype.deleteAt = function(index) {
  //when list is empty
  if (!this.head) {
    this.head = new Node(data);
    return;
  }
  // node needs to be deleted from the from of the list i.e before the head
  if (index === 0) {
    this.head = this.head.next;
    return;
  }
  //else use getAt() to find the previous node
  const previous = this.getAt(index - 1);

  if (!previous || !previous.next) {
    return;
  }
  previous.next = previous.next.next;
  return this.head;
};

LinkedList.prototype.deleteList = function() {
  this.head = null;
};

let list = new LinkedList();
list.insertAtBeginning(41);
list.insertAtBeginning(42);
list.insertAtBeginning(43);
list.insertAtBeginning(44);
list.insertAtEnd(42);

list.insertAtEnd(99);
console.log(util.inspect(list, { depth: null }));
