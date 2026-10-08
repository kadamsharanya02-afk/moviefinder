package com.moviefinder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_preferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "horror_pref")
    private Integer horrorPref = 50;

    @Column(name = "romance_pref")
    private Integer romancePref = 50;

    @Column(name = "thriller_pref")
    private Integer thrillerPref = 50;

    @Column(name = "comedy_pref")
    private Integer comedyPref = 50;

    @Column(name = "drama_pref")
    private Integer dramaPref = 50;

    @Column(name = "action_pref")
    private Integer actionPref = 50;

    @Column(name = "mystery_pref")
    private Integer mysteryPref = 50;

    @Column(name = "violence_pref")
    private Integer violencePref = 50;

    @Column(name = "darkness_pref")
    private Integer darknessPref = 50;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserPreference() {}

    public UserPreference(User user) {
        this.user = user;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getHorrorPref() { return horrorPref; }
    public void setHorrorPref(Integer horrorPref) { this.horrorPref = horrorPref; }

    public Integer getRomancePref() { return romancePref; }
    public void setRomancePref(Integer romancePref) { this.romancePref = romancePref; }

    public Integer getThrillerPref() { return thrillerPref; }
    public void setThrillerPref(Integer thrillerPref) { this.thrillerPref = thrillerPref; }

    public Integer getComedyPref() { return comedyPref; }
    public void setComedyPref(Integer comedyPref) { this.comedyPref = comedyPref; }

    public Integer getDramaPref() { return dramaPref; }
    public void setDramaPref(Integer dramaPref) { this.dramaPref = dramaPref; }

    public Integer getActionPref() { return actionPref; }
    public void setActionPref(Integer actionPref) { this.actionPref = actionPref; }

    public Integer getMysteryPref() { return mysteryPref; }
    public void setMysteryPref(Integer mysteryPref) { this.mysteryPref = mysteryPref; }

    public Integer getViolencePref() { return violencePref; }
    public void setViolencePref(Integer violencePref) { this.violencePref = violencePref; }

    public Integer getDarknessPref() { return darknessPref; }
    public void setDarknessPref(Integer darknessPref) { this.darknessPref = darknessPref; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
