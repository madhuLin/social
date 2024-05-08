// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SocialMedia {
    struct User {
        string name;
        uint256 articleNum;
        mapping(uint256 => uint256) articles;
    }
    mapping(address => User) public users;
    uint256 public userCount;

    struct Article {
        string username;
        string title;
        string content;
        address payable author;
        uint256 timestamp;
        // uint commentsNum;
        mapping(uint256 => Comment) comments;
    }

    uint256 public articleCount;
    mapping(uint256 => Article) public articles;

    struct Comment {
        string content;
        address author;
    }

    function registerUser(string memory _name) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        User storage newUser = users[msg.sender];

        newUser.articleNum = 0;
        newUser.name = _name; 
        userCount++;
    }

    // 儲存文章發布的交易哈希
    mapping(uint256 => bytes32) public articleTransactionHashes;

    function publish(
        // string memory _username, // 新的参数
        string memory _title,
        string memory _content,
        uint256 _timestamp
    ) public returns (uint256 articleId) {
        // require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(users[msg.sender].name).length > 0, "User must be registered");

        // 创建一个空的 Article 实例
        Article storage newArticle = articles[articleCount++];
        
        // 设置 Article 实例的各个字段
        newArticle.username = users[msg.sender].name; // 设置用户名
        newArticle.title = _title;
        newArticle.content = _content;
        newArticle.author = payable(msg.sender);
        newArticle.timestamp = _timestamp; // 设置 timestamp 字段为当前区块时间

        // 关联用户与文章
        users[msg.sender].articles[users[msg.sender].articleNum++] = articleCount - 1;
        // 記錄發布文章的交易哈希
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, _title, _content, _timestamp));
        articleTransactionHashes[articleCount - 1] = txHash;

        // 返回文章的 ID
        return articleCount - 1;
    }

    function setArticle(
        uint256 _articleId,
        string memory _title,
        string memory _content
    ) public {
        if (msg.sender != articles[_articleId].author) return;
        articles[_articleId].title = _title;
        articles[_articleId].content = _content;
    }

    function getUserInfo(address _address) 
        public 
        view 
        returns (
            string memory username, 
            uint256 articleNum) 
    {
        User storage _user = users[_address];
        return (_user.name, _user.articleNum);
    }

    function getArticle(uint256 _articleId)
        public
        view
        returns (
            string memory username,
            string memory title,
            string memory content,
            address author,
            uint256 timestamp
        )
    {
        
        Article storage _article = articles[_articleId];
        return (
            _article.username,
            _article.title,
            _article.content,
            _article.author,
            _article.timestamp
        );
        
    }

    function getAllArticles() public view returns (uint256[] memory) {
        uint256[] memory articleIds = new uint256[](articleCount);
        for (uint256 i = 0; i < articleCount; i++) {
            articleIds[i] = i;
        }
        return articleIds;
    }

    function getArticleSummary(uint256 _articleId)
        public
        view
        returns (
            string memory title,
            address author,
            uint256 timestamp
        )
    {
        Article storage _article = articles[_articleId];
        return (_article.title, _article.author, _article.timestamp);
    } 
}
