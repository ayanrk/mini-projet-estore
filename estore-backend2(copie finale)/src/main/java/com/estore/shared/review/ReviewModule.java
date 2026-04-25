package com.estore.shared.review;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

// ---- Document MongoDB ----
@Document(collection = "reviews")
class Review {
    @Id private String id;
    private Long productId;
    private Long userId;
    private String authorName;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;

    public Review() {}
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

// ---- Repository ----
interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductId(Long productId);
    List<Review> findByUserId(Long userId);
}

// ---- DTO ----
class ReviewRequest {
    private Long productId;
    private Long userId;
    private String authorName;
    private int rating;
    private String comment;

    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
    public Long getUserId() { return userId; }
    public void setUserId(Long v) { this.userId = v; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String v) { this.authorName = v; }
    public int getRating() { return rating; }
    public void setRating(int v) { this.rating = v; }
    public String getComment() { return comment; }
    public void setComment(String v) { this.comment = v; }
}

// ---- Service ----
@Service
class ReviewService {
    private final ReviewRepository reviewRepository;
    ReviewService(ReviewRepository reviewRepository) { this.reviewRepository = reviewRepository; }

    public Review addReview(ReviewRequest req) {
        Review r = new Review();
        r.setProductId(req.getProductId());
        r.setUserId(req.getUserId());
        r.setAuthorName(req.getAuthorName());
        r.setRating(req.getRating());
        r.setComment(req.getComment());
        r.setCreatedAt(LocalDateTime.now());
        return reviewRepository.save(r);
    }

    public List<Review> getByProduct(Long productId) { return reviewRepository.findByProductId(productId); }
    public List<Review> getByUser(Long userId) { return reviewRepository.findByUserId(userId); }
}

// ---- Controller ----
@RestController
@RequestMapping("/api/reviews")
class ReviewController {
    private final ReviewService reviewService;
    ReviewController(ReviewService reviewService) { this.reviewService = reviewService; }

    @PostMapping
    public ResponseEntity<Review> add(@RequestBody ReviewRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(req));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> byProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getByProduct(productId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getByUser(userId));
    }
}
