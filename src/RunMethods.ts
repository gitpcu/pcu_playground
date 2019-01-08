import LinkedList from "./lib/LinkedList";
import LinkedStack from "./lib/LinkedStack";
import LinkedQueue from "./lib/LinkedQueue";
import DoubleLinkedList from "./lib/DoubleLinkedList";
import ArrayStack from "./lib/ArrayStack";

export const linkedListTest = () => {
  console.log("**************************LinkedList**************************");
  const list = new LinkedList<string>('슈프림', '발렌시아가', '스투시', '마르지엘라', '코스');

  console.log(list);
  console.log(list.get(0));
  list.remove(1);
  console.log(list);
  console.log('--------------------------------------------------------');

  //list.removeLast();
  console.log(list.indexOf('코스'));
  console.log(list);
  console.log(list.get(4));

  console.log('--------------------------------------------------------');

  list.add(10, '오프화이트');
  console.log(list.get(1).toString());
  console.log(list.toString());

  console.log('--------------------------------------------------------');
  const iterator = list.getIterator();
  while(iterator.hasNext()) {
    const data = iterator.next();
    console.log(data);

    if(data === '슈프림') {
      iterator.add('프라다');
    }
    if(data === '스투시') {
      iterator.remove();
    }
    if(data === '코스') {
      iterator.remove();
    }
  }
  console.log(list.toString())
  
  console.log('--------------------------------------------------------');

  console.log(iterator.next());
  console.log(list.toString());
}
  
export const linkedStackTest = () => {
  console.log("**************************Stack**************************");
    const stack = new LinkedStack();
    stack.push("패션인테크");
    stack.push("구글");
    stack.push("카카오");
    stack.push("네이버");
    stack.push("NHN");
    stack.push("패션인테크");
    
    console.log(stack.search('NHN'));
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.search('NHN'));

    console.log('--------------------------------------------------------');

    stack.push("애플");
    console.log(stack.peek());

    console.log('--------------------------------------------------------');

    const iterator = stack.getIterator();
    while(iterator.hasNext()) {
      console.log(iterator.next());
    }
    iterator.next();

    console.log('--------------------------------------------------------');

    while(!stack.empty()) {
      console.log(stack.pop());
    }
    console.log(stack.empty());
    
    console.log('--------------------------------------------------------');

    console.log(stack);
    stack.pop();
    stack.peek();
}
  
export const linkedQueueTest = () => {
  console.log("**************************Queue**************************");
  const queue = new LinkedQueue();
  queue.enqueue("구글");
  queue.enqueue("카카오");
  queue.enqueue("네이버");
  queue.enqueue("NHN");
  queue.enqueue("패션인테크");
  
  console.log(queue);
  console.log(queue.peek());
  
  console.log('---------------------------이터레이터-----------------------------');

  const iterator = queue.getIterator();
  while(iterator.hasNext()) {
    console.log(iterator.next());
  }

  console.log('--------------------------------------------------------');

  while(!queue.empty()) {
    console.log(`삭제: ${queue.dequeue()}`);
  }
  console.log(queue);
}

export const doubleLinkedListTest = () => {
  const dList = new DoubleLinkedList('슈프림', '발렌시아가', '스투시', '마르지엘라', '코스');
  console.log(dList);
  const iterator = dList.getIterator();
  while(iterator.hasNext()) {
    const data = iterator.next();
    console.log(data);
    
    if(data === '슈프림') {
      iterator.add('댕댕이');
    }
    if(data === '스투시') {
      iterator.remove();
    }
    if(data === '마르지엘라') {
      iterator.add('올리브영');
    }
  }
  console.log(dList.toString());
  console.log(dList.get(0));

  console.log('****************반대로****************');
  while(iterator.hasPrev()) {
    const data = iterator.prev();
    console.log (data);

    if(data === '코스') {
      iterator.add('엘지');
    }
    if(data === '올리브영') {
      iterator.add('롭스');
    }
    if(data === '마르지엘라') {
      iterator.remove();
    }
    if(data === '슈프림') {
      iterator.remove();
    }
  }
  iterator.prev();
  console.log(dList.toString());

  console.log('****************정방향****************');
  while(iterator.hasNext()) {
    console.log(iterator.next());
  }

  console.log('--------------------------------------------------------');
}

export const arrayStackTest = () => {
  const stack = new ArrayStack<string>(5);
  stack.push("나이키");
  stack.push("아디다스");
  stack.push("뉴발란스");
  stack.push("컨버스");
  stack.push("리복");
  console.log(stack.toString());
  stack.push("휠라");

  console.log(stack.search('아디다스'));
  stack.pop();
  stack.pop();
  console.log(stack.toString());

  console.log('-------------------------이터레이터-------------------------------');

  const iterator = stack.getIterator();
  while(iterator.hasNext()) {
    console.log(iterator.next());
  }
  iterator.next();

  console.log('--------------------------------------------------------');

  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.toString());
  
  console.log('--------------------------------------------------------');

  console.log(stack.peek());
  console.log(stack.pop());

  console.log('--------------------------------------------------------');

  stack.push("1");
  console.log(stack.toString());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.toString());
}