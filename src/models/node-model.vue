<script>
export default class Node {
  constructor (nodeID, type) {
        this.nodeID = nodeID;
        this.type = type;
        this.isStart = null;
        this.isFinish = null;
        this.distance = Infinity,
        this.isVisited = false;
        this.isWall = false;
        this.previousNode = null;
    }    
}
</script>
